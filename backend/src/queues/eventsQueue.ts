import { Queue } from "bullmq";
import { redisConnection } from "./connection";

export interface ApiEventPayload {
  endpoint: string;
  durationMs: number;
  timestamp: string;
  hour: number;
}

export const eventsQueue = new Queue<ApiEventPayload>("api-events", {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: false,
    removeOnFail: 100,
  },
});

export function emitApiEvent(endpoint: string, durationMs: number): void {
  const now = new Date();

  eventsQueue
    .add("api-event", {
      endpoint,
      durationMs,
      timestamp: now.toISOString(),
      hour: now.getUTCHours(),
    })
    .catch((err) => console.error("Failed to emit event:", err));
}
