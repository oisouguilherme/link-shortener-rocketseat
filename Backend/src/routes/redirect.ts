import { FastifyInstance } from "fastify";
import { eq, sql } from "drizzle-orm";
import { db } from "../database/connection";
import { links } from "../database/schema";
import { shortCodeParamSchema, ShortCodeParam } from "../types/validation";

export async function redirectRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: ShortCodeParam }>(
    "/:shortCode",
    async (request, reply) => {
      try {
        const { shortCode } = shortCodeParamSchema.parse(request.params);

        const [existingLink] = await db
          .select()
          .from(links)
          .where(eq(links.shortCode, shortCode))
          .limit(1);

        if (!existingLink) {
          return reply.redirect(302, `${process.env.CORS_ORIGIN}/404`);
        }

        await db
          .update(links)
          .set({
            accessCount: sql`${links.accessCount} + 1`,
            updatedAt: new Date(),
          })
          .where(eq(links.shortCode, shortCode));

        return reply.redirect(301, existingLink.originalUrl);
      } catch (error) {
        fastify.log.error(error);
        return reply.redirect(302, `${process.env.CORS_ORIGIN}/404`);
      }
    }
  );
}
