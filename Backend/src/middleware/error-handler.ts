import { FastifyInstance, FastifyError } from "fastify";
import { ZodError } from "zod";

export async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    // Log do erro
    fastify.log.error(error);

    // Tratamento específico para erros do Zod
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Dados inválidos",
        message: "Os dados fornecidos não atendem aos critérios de validação",
        details: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Erro de duplicação no banco (PostgreSQL)
    if (error.code === "23505") {
      return reply.status(409).send({
        error: "Conflito de dados",
        message: "Já existe um registro com essas informações",
      });
    }

    // Erro de conexão com banco
    if (error.code === "ECONNREFUSED") {
      return reply.status(503).send({
        error: "Serviço indisponível",
        message: "Não foi possível conectar ao banco de dados",
      });
    }

    // Erro de validação do Fastify
    if (error.validation) {
      return reply.status(400).send({
        error: "Dados inválidos",
        message: "Os dados fornecidos não são válidos",
        details: error.validation,
      });
    }

    // Erro genérico
    return reply.status(error.statusCode || 500).send({
      error: error.name || "Erro interno",
      message: error.message || "Ocorreu um erro inesperado",
    });
  });
}
