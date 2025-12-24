# SWStarter Backend

Node.js BFF that proxies Star Wars API requests and computes usage statistics.

## Running Locally (without Docker)

### Prerequisites

- Node.js 20+
- PostgreSQL running on localhost:5432
- Redis running on localhost:6379

### Setup

```bash
# Install dependencies
npm install

# Create .env file
cp env.example .env

# Run migrations
npm run migrate:dev

# Start the server
npm run dev

# In another terminal, start the worker
npm run worker:dev
```

### Environment Variables

| Variable              | Default                                                 |
| --------------------- | ------------------------------------------------------- |
| `PORT`                | 3001                                                    |
| `DATABASE_URL`        | postgresql://postgres:postgres@localhost:5432/swstarter |
| `REDIS_HOST`          | localhost                                               |
| `REDIS_PORT`          | 6379                                                    |
| `STATS_CRON_INTERVAL` | 300000 (5 min)                                          |

## API Endpoints

| Endpoint            | Description                |
| ------------------- | -------------------------- |
| GET /api/search     | Search people or films     |
| GET /api/people/:id | Get person details         |
| GET /api/films/:id  | Get film details           |
| GET /api/stats      | Get precomputed statistics |
| GET /health         | Health check               |
| GET /docs           | Swagger UI                 |

## Build for Production

```bash
npm run build
npm start          # API server
npm run worker     # Worker process
```
