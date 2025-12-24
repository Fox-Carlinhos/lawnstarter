import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { swApiService, NotFoundError } from "../services/swApiService";
import { emitApiEvent } from "../queues/eventsQueue";
import { ApiPaths } from "../constants/apiPaths";
import { SearchType, SEARCH_TYPES } from "../constants/searchTypes";
import { SearchInputSchema, ResourceIdSchema } from "../schemas/searchSchemas";

export async function searchRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    ApiPaths.SEARCH,
    {
      schema: {
        description:
          "Search for Star Wars people or films. Returns minimal data for listing.",
        tags: ["search"],
        querystring: {
          type: "object",
          properties: {
            q: { type: "string", description: "Search query term" },
            type: {
              type: "string",
              enum: SEARCH_TYPES,
              default: SearchType.PEOPLE,
              description: "Resource type to search",
            },
          },
          required: ["q"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const input = request.query as Record<string, unknown>;
      const parsed = SearchInputSchema.safeParse(input);

      if (!parsed.success) {
        const errorMessage = parsed.error.issues
          .map((issue) => issue.message)
          .join(", ");

        return reply.status(400).send({
          success: false,
          error: errorMessage,
        });
      }

      const { q, type } = parsed.data;

      try {
        let result;

        if (type === SearchType.FILMS) {
          result = await swApiService.searchFilms(q);
        } else {
          result = await swApiService.searchPeople(q);
        }

        emitApiEvent(ApiPaths.SEARCH, result.durationMs);

        return reply.send({
          success: true,
          data: result.data,
          meta: {
            count: result.count,
          },
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        request.log.error(error, "Search failed");

        return reply.status(500).send({
          success: false,
          error: message,
        });
      }
    }
  );

  fastify.get(
    ApiPaths.PEOPLE_DETAIL,
    {
      schema: {
        description: "Get detailed information about a Star Wars character",
        tags: [SearchType.PEOPLE],
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "Character ID" },
          },
          required: ["id"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const input = request.params as Record<string, unknown>;
      const parsed = ResourceIdSchema.safeParse(input);

      if (!parsed.success) {
        const errorMessage = parsed.error.issues
          .map((issue) => issue.message)
          .join(", ");

        return reply.status(400).send({
          success: false,
          error: errorMessage,
        });
      }

      const { id } = parsed.data;

      try {
        const result = await swApiService.getPersonById(id);

        emitApiEvent(ApiPaths.PEOPLE_DETAIL, result.durationMs);

        return reply.send({
          success: true,
          data: result.data,
        });
      } catch (error: unknown) {
        if (error instanceof NotFoundError) {
          return reply.status(404).send({
            success: false,
            error: error.message,
          });
        }

        const message =
          error instanceof Error ? error.message : "Unknown error";
        request.log.error(error, "Get person failed");

        return reply.status(500).send({
          success: false,
          error: message,
        });
      }
    }
  );

  fastify.get(
    ApiPaths.FILMS_DETAIL,
    {
      schema: {
        description: "Get detailed information about a Star Wars film",
        tags: [SearchType.FILMS],
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "Film ID" },
          },
          required: ["id"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const input = request.params as Record<string, unknown>;
      const parsed = ResourceIdSchema.safeParse(input);

      if (!parsed.success) {
        const errorMessage = parsed.error.issues
          .map((issue) => issue.message)
          .join(", ");

        return reply.status(400).send({
          success: false,
          error: errorMessage,
        });
      }

      const { id } = parsed.data;

      try {
        const result = await swApiService.getFilmById(id);

        emitApiEvent(ApiPaths.FILMS_DETAIL, result.durationMs);

        return reply.send({
          success: true,
          data: result.data,
        });
      } catch (error: unknown) {
        if (error instanceof NotFoundError) {
          return reply.status(404).send({
            success: false,
            error: error.message,
          });
        }

        const message =
          error instanceof Error ? error.message : "Unknown error";
        request.log.error(error, "Get film failed");

        return reply.status(500).send({
          success: false,
          error: message,
        });
      }
    }
  );
}
