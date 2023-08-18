import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '@/routes';

/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Circle-sass OpenAPI',
  description: 'OpenAPI compliant REST API built using tRPC with Express',
  version: '1.0.0',
  baseUrl: '/api',
  docsUrl: 'https://github.com/jlalmes/trpc-openapi',
  tags: ['circle'],
});