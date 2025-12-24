import { pool } from "../db/pool";

export interface EndpointStat {
  endpoint: string;
  count: number;
  percentage: number;
  avgLatencyMs: number;
}

export interface HourlyStat {
  hour: number;
  count: number;
  percentage: number;
}

export interface Statistics {
  topEndpoints: EndpointStat[];
  averageLatencyMs: number;
  popularHours: HourlyStat[];
  totalRequests: number;
  computedAt: string;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

class StatsService {
  async getStats(): Promise<Statistics> {
    const client = await pool.connect();

    try {
      const globalResult = await client.query<{
        total_requests: number;
        total_latency_ms: string;
        last_computed_at: Date;
      }>(
        "SELECT total_requests, total_latency_ms, last_computed_at FROM global_stats WHERE id = 1"
      );

      const global = globalResult.rows[0];
      const totalRequests = global?.total_requests || 0;
      const totalLatency = parseInt(global?.total_latency_ms || "0", 10);
      const computedAt =
        global?.last_computed_at?.toISOString() || new Date().toISOString();

      if (totalRequests === 0) {
        return {
          topEndpoints: [],
          averageLatencyMs: 0,
          popularHours: [],
          totalRequests: 0,
          computedAt,
        };
      }

      const endpointsResult = await client.query<{
        endpoint: string;
        request_count: number;
        total_latency_ms: string;
      }>(
        `SELECT endpoint, request_count, total_latency_ms 
         FROM endpoint_stats 
         WHERE request_count > 0
         ORDER BY request_count DESC 
         LIMIT 5`
      );

      const topEndpoints: EndpointStat[] = endpointsResult.rows.map((row) => ({
        endpoint: row.endpoint,
        count: row.request_count,
        percentage: round2((row.request_count / totalRequests) * 100),
        avgLatencyMs: round2(
          parseInt(row.total_latency_ms, 10) / row.request_count
        ),
      }));

      const hourlyResult = await client.query<{
        hour: number;
        request_count: number;
      }>(
        `SELECT hour, request_count 
         FROM hourly_stats 
         WHERE request_count > 0
         ORDER BY request_count DESC`
      );

      const popularHours: HourlyStat[] = hourlyResult.rows.map((row) => ({
        hour: row.hour,
        count: row.request_count,
        percentage: round2((row.request_count / totalRequests) * 100),
      }));

      const averageLatencyMs = round2(totalLatency / totalRequests);

      return {
        topEndpoints,
        averageLatencyMs,
        popularHours,
        totalRequests,
        computedAt,
      };
    } finally {
      client.release();
    }
  }

  async updateStats(
    endpointCounts: Map<string, { count: number; latency: number }>,
    hourlyCounts: Map<number, number>,
    totalCount: number,
    totalLatency: number
  ): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const [endpoint, data] of endpointCounts) {
        await client.query(
          `INSERT INTO endpoint_stats (endpoint, request_count, total_latency_ms, last_updated_at)
           VALUES ($1, $2, $3, NOW())
           ON CONFLICT (endpoint) DO UPDATE SET
             request_count = endpoint_stats.request_count + EXCLUDED.request_count,
             total_latency_ms = endpoint_stats.total_latency_ms + EXCLUDED.total_latency_ms,
             last_updated_at = NOW()`,
          [endpoint, data.count, data.latency]
        );
      }

      for (const [hour, count] of hourlyCounts) {
        await client.query(
          `UPDATE hourly_stats 
           SET request_count = request_count + $1, last_updated_at = NOW()
           WHERE hour = $2`,
          [count, hour]
        );
      }

      await client.query(
        `UPDATE global_stats 
         SET total_requests = total_requests + $1,
             total_latency_ms = total_latency_ms + $2,
             last_computed_at = NOW()
         WHERE id = 1`,
        [totalCount, totalLatency]
      );

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}

export const statsService = new StatsService();
