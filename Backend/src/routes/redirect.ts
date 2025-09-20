import { FastifyInstance } from "fastify";
import { eq, sql } from "drizzle-orm";
import { db } from "../database/connection";
import { links } from "../database/schema";
import { shortCodeParamSchema, ShortCodeParam } from "../types/validation";

export async function redirectRoutes(fastify: FastifyInstance) {
  // Redirecionar para URL original e incrementar contador
  fastify.get<{ Params: ShortCodeParam }>(
    "/:shortCode",
    async (request, reply) => {
      try {
        const { shortCode } = shortCodeParamSchema.parse(request.params);

        // Buscar o link e incrementar contador em uma única operação
        const [link] = await db
          .update(links)
          .set({
            accessCount: sql`${links.accessCount} + 1`,
            updatedAt: new Date(),
          })
          .where(eq(links.shortCode, shortCode))
          .returning();

        if (!link) {
          return reply.status(404).send({
            error: "Link não encontrado",
            message: "O código encurtado não existe",
          });
        }

        // Redirecionar para a URL original
        return reply.redirect(301, link.originalUrl);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: "Erro interno do servidor",
        });
      }
    }
  );
}
