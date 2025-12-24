import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { env } from "./config/env";
import { searchRoutes } from "./routes/search";
import { statsRoutes } from "./routes/stats";
import { healthRoutes } from "./routes/health";

const fastify = Fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "debug",
  },
});

async function main(): Promise<void> {
  await fastify.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "SWStarter BFF API",
        description: "Backend-for-Frontend API for Star Wars search application",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: "Development server",
        },
      ],
      tags: [
        { name: "search", description: "Search endpoints" },
        { name: "people", description: "People endpoints" },
        { name: "films", description: "Films endpoints" },
        { name: "stats", description: "Statistics endpoints" },
        { name: "system", description: "System endpoints" },
      ],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  await fastify.register(healthRoutes);
  await fastify.register(searchRoutes);
  await fastify.register(statsRoutes);

  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
    console.log(`Server running at http://${env.HOST}:${env.PORT}`);
    console.log(`Swagger docs at http://${env.HOST}:${env.PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  await fastify.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await fastify.close();
  process.exit(0);
});
