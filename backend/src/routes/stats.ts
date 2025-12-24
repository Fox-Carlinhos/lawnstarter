import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { statsService } from "../services/statsService";
import { ApiPaths } from "../constants/apiPaths";

export async function statsRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    ApiPaths.STATS,
    {
      schema: {
        description: "Get precomputed API statistics. Updated every 5 minutes.",
        tags: ["stats"],
      },
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const stats = await statsService.getStats();

        if (stats.totalRequests === 0) {
          return reply.send({
            success: true,
            data: stats,
            message: "No requests recorded yet. Stats update every 5 minutes.",
          });
        }

        return reply.send({
          success: true,
          data: stats,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";

        return reply.status(500).send({
          success: false,
          error: message,
        });
      }
    }
  );
}
