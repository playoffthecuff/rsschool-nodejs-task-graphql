import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import dl from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
        const d = parse(req.body.query);
        const errors = validate(schema, d, [dl(5)]);
        return errors.length ? {errors} : graphql({
          source: req.body.query,
          variableValues: req.body.variables,
          schema,
          contextValue: { prisma },
        });
    },
  });
};

export default plugin;
