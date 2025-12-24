import { Queue, Worker } from "bullmq";
import { redisConnection } from "./queues/connection";
import { statsService } from "./services/statsService";
import { env } from "./config/env";
import type { ApiEventPayload } from "./queues/eventsQueue";

console.log("Starting BFF Worker...");

const statsProcessorQueue = new Queue("stats-processor", {
  connection: redisConnection,
});

const BATCH_SIZE = 1000;

async function processEvents(): Promise<void> {
  console.log("Processing queued events...");

  const eventsQueue = new Queue<ApiEventPayload>("api-events", {
    connection: redisConnection,
  });

  const endpointCounts = new Map<string, { count: number; latency: number }>();
  const hourlyCounts = new Map<number, number>();
  let totalCount = 0;
  let totalLatency = 0;
  let processedCount = 0;
  let hasMoreJobs = true;

  while (hasMoreJobs) {
    const jobs = await eventsQueue.getJobs(
      ["completed", "waiting"],
      0,
      BATCH_SIZE - 1
    );

    if (jobs.length === 0) {
      hasMoreJobs = false;
      break;
    }

    for (const job of jobs) {
      if (!job.data) continue;

      const { endpoint, durationMs, hour } = job.data;

      const existing = endpointCounts.get(endpoint) || { count: 0, latency: 0 };
      endpointCounts.set(endpoint, {
        count: existing.count + 1,
        latency: existing.latency + durationMs,
      });

      hourlyCounts.set(hour, (hourlyCounts.get(hour) || 0) + 1);

      totalCount++;
      totalLatency += durationMs;

      await job.remove();
      processedCount++;
    }

    hasMoreJobs = jobs.length === BATCH_SIZE;
  }

  if (totalCount > 0) {
    await statsService.updateStats(
      endpointCounts,
      hourlyCounts,
      totalCount,
      totalLatency
    );
    console.log(`Processed ${processedCount} events, updated stats`);
  } else {
    console.log("No new events to process");
  }
}

const statsWorker = new Worker(
  "stats-processor",
  async () => {
    await processEvents();
  },
  { connection: redisConnection }
);

statsWorker.on("completed", (job) => {
  console.log(`Stats processing completed: ${job.id}`);
});

statsWorker.on("failed", (job, err) => {
  console.error(`Stats processing failed: ${job?.id}`, err);
});

async function scheduleStatsProcessor(): Promise<void> {
  await statsProcessorQueue.upsertJobScheduler(
    "stats-processor-scheduler",
    {
      every: env.STATS_CRON_INTERVAL,
    },
    {
      name: "process-stats",
      data: {},
    }
  );

  console.log(
    `Stats processor scheduled every ${env.STATS_CRON_INTERVAL / 1000} seconds`
  );
}

async function main(): Promise<void> {
  await scheduleStatsProcessor();
  console.log("Worker is running. Press Ctrl+C to exit.");
}

main().catch(console.error);

process.on("SIGTERM", async () => {
  console.log("Shutting down worker...");
  await statsWorker.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await statsWorker.close();
  process.exit(0);
});
