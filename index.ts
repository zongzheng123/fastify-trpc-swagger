"use strict";

import path from "path";
import AutoLoad from "@fastify/autoload";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "@/lib/trpc";
import { appRouter } from "@/routes";
import fastify from "fastify";
import cors from "@fastify/cors";
import { openApiDocument } from "@/lib/openapi";
import { fastifyTRPCOpenApiPlugin } from "trpc-openapi";
import fastifySwagger from "@fastify/swagger";

async function main() {
  const server = fastify();

  server.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  // await server.register(require("@fastify/static"), {
  //   root: path.join(__dirname, "public"),
  //   prefix: "/public/", // optional: default '/'
  //   // constraints: { host: 'example.com' } // optional: default {}
  // });
  await server.register(cors, {
    // put your options here
  });

  // await server.register(AutoLoad, {
  //   dir: path.join(__dirname, "plugins"),
  //   // options: Object.assign({}, opts)
  // });

  // // This loads all plugins defined in routes
  // // define your routes in one of these
  // await server.register(AutoLoad, {
  //   dir: path.join(__dirname, "routes"),
  //   // options: Object.assign({}, opts)
  // });
  await server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    useWss: false,
    trpcOptions: { router: appRouter, createContext },
  } as any);
  await server.register(fastifyTRPCOpenApiPlugin, {
    basePath: "/api",
    router: appRouter,
    createContext,
  });
  server.get("/openapi.json", () => openApiDocument);

  // Server Swagger UI
  // @ts-ignore
  await server.register(fastifySwagger, {
    // routePrefix: "/docs",
    mode: "static",
    specification: { document: openApiDocument },
    // uiConfig: { displayOperationId: true },
    // exposeRoute: true,
  });
  await server.register(require('@fastify/swagger-ui'), {
    routePrefix: '/swagger',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    // uiHooks: {
    //   onRequest: function (request, reply, next) { next() },
    //   preHandler: function (request, reply, next) { next() }
    // },
    staticCSP: true,
    // transformStaticCSP: (header) => header,
    // transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

  server.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
