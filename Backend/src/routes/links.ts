import { FastifyInstance } from "fastify";
import { nanoid } from "nanoid";
import { eq, desc, sql } from "drizzle-orm";
import { db } from "../database/connection";
import { links } from "../database/schema";
import {
  createLinkSchema,
  shortCodeParamSchema,
  listLinksQuerySchema,
  CreateLinkBody,
  ShortCodeParam,
  ListLinksQuery,
} from "../types/validation";

export async function linksRoutes(fastify: FastifyInstance) {
  // Criar um novo link
  fastify.post<{ Body: CreateLinkBody }>("/links", async (request, reply) => {
    try {
      const { originalUrl, shortCode } = createLinkSchema.parse(request.body);

      // Gerar código único se não fornecido
      const finalShortCode = shortCode || nanoid(8);

      // Verificar se o código já existe
      const existingLink = await db
        .select()
        .from(links)
        .where(eq(links.shortCode, finalShortCode))
        .limit(1);

      if (existingLink.length > 0) {
        return reply.status(409).send({
          error: "Short code já existe",
          message: "Este código encurtado já está sendo usado",
        });
      }

      // Criar o link
      const [newLink] = await db
        .insert(links)
        .values({
          originalUrl,
          shortCode: finalShortCode,
        })
        .returning();

      return reply.status(201).send({
        id: newLink.id,
        originalUrl: newLink.originalUrl,
        shortCode: newLink.shortCode,
        shortUrl: `${process.env.APP_URL}/${newLink.shortCode}`,
        accessCount: newLink.accessCount,
        createdAt: newLink.createdAt,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return reply.status(400).send({
          error: "Dados inválidos",
          details: error,
        });
      }

      fastify.log.error(error);
      return reply.status(500).send({
        error: "Erro interno do servidor",
      });
    }
  });

  // Listar todos os links
  fastify.get<{ Querystring: ListLinksQuery }>(
    "/links",
    async (request, reply) => {
      try {
        const { page, limit } = listLinksQuerySchema.parse(request.query);
        const offset = (page - 1) * limit;

        const allLinks = await db
          .select()
          .from(links)
          .orderBy(desc(links.createdAt))
          .limit(limit)
          .offset(offset);

        // Contar total para paginação
        const [{ count }] = await db
          .select({ count: sql<number>`count(*)` })
          .from(links);

        const totalPages = Math.ceil(count / limit);

        return {
          links: allLinks.map((link) => ({
            id: link.id,
            originalUrl: link.originalUrl,
            shortCode: link.shortCode,
            shortUrl: `${process.env.APP_URL}/${link.shortCode}`,
            accessCount: link.accessCount,
            createdAt: link.createdAt,
          })),
          pagination: {
            page,
            limit,
            total: count,
            totalPages,
          },
        };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: "Erro interno do servidor",
        });
      }
    }
  );

  // Deletar um link
  fastify.delete<{ Params: ShortCodeParam }>(
    "/links/:shortCode",
    async (request, reply) => {
      try {
        const { shortCode } = shortCodeParamSchema.parse(request.params);

        const [deletedLink] = await db
          .delete(links)
          .where(eq(links.shortCode, shortCode))
          .returning();

        if (!deletedLink) {
          return reply.status(404).send({
            error: "Link não encontrado",
          });
        }

        return reply.status(204).send();
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: "Erro interno do servidor",
        });
      }
    }
  );

  // Incrementar contador de acesso
  fastify.patch<{ Params: ShortCodeParam }>(
    "/links/:shortCode/access",
    async (request, reply) => {
      try {
        const { shortCode } = shortCodeParamSchema.parse(request.params);

        const [updatedLink] = await db
          .update(links)
          .set({
            accessCount: sql`${links.accessCount} + 1`,
            updatedAt: new Date(),
          })
          .where(eq(links.shortCode, shortCode))
          .returning();

        if (!updatedLink) {
          return reply.status(404).send({
            error: "Link não encontrado",
          });
        }

        return {
          id: updatedLink.id,
          shortCode: updatedLink.shortCode,
          accessCount: updatedLink.accessCount,
        };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: "Erro interno do servidor",
        });
      }
    }
  );
}
