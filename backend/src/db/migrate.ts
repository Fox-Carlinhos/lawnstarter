import { pool } from "./pool";

const migrations = [
  {
    version: 1,
    name: "create_endpoint_stats_table",
    up: `
      CREATE TABLE IF NOT EXISTS endpoint_stats (
        endpoint VARCHAR(255) PRIMARY KEY,
        request_count INTEGER NOT NULL DEFAULT 0,
        total_latency_ms BIGINT NOT NULL DEFAULT 0,
        last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `,
  },
  {
    version: 2,
    name: "create_hourly_stats_table",
    up: `
      CREATE TABLE IF NOT EXISTS hourly_stats (
        hour INTEGER PRIMARY KEY CHECK (hour >= 0 AND hour <= 23),
        request_count INTEGER NOT NULL DEFAULT 0,
        last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      INSERT INTO hourly_stats (hour, request_count)
      SELECT generate_series(0, 23), 0
      ON CONFLICT DO NOTHING;
    `,
  },
  {
    version: 3,
    name: "create_global_stats_table",
    up: `
      CREATE TABLE IF NOT EXISTS global_stats (
        id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        total_requests INTEGER NOT NULL DEFAULT 0,
        total_latency_ms BIGINT NOT NULL DEFAULT 0,
        last_computed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      INSERT INTO global_stats (id, total_requests, total_latency_ms)
      VALUES (1, 0, 0)
      ON CONFLICT DO NOTHING;
    `,
  },
];

async function runMigrations(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        version INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const { rows } = await client.query<{ version: number }>(
      "SELECT version FROM migrations ORDER BY version"
    );
    const appliedVersions = new Set(rows.map((r) => r.version));

    for (const migration of migrations) {
      if (appliedVersions.has(migration.version)) {
        console.log(
          `Migration ${migration.version} (${migration.name}) already applied`
        );
        continue;
      }

      console.log(`Applying migration ${migration.version}: ${migration.name}`);
      await client.query("BEGIN");

      try {
        await client.query(migration.up);
        await client.query(
          "INSERT INTO migrations (version, name) VALUES ($1, $2)",
          [migration.version, migration.name]
        );
        await client.query("COMMIT");
        console.log(`Migration ${migration.version} applied successfully`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }

    console.log("All migrations completed");
  } finally {
    client.release();
  }

  await pool.end();
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
