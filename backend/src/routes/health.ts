import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/pool";
import { ApiPaths } from "../constants/apiPaths";

export async function healthRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    ApiPaths.HEALTH,
    {
      schema: {
        description: "Health check endpoint",
        tags: ["system"],
      },
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        await pool.query("SELECT 1");

        return reply.send({
          status: "healthy",
          timestamp: new Date().toISOString(),
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";

        return reply.status(503).send({
          status: "unhealthy",
          error: message,
          timestamp: new Date().toISOString(),
        });
      }
    }
  );
}
