import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { linksRoutes } from "./routes/links";
import { redirectRoutes } from "./routes/redirect";
import { exportRoutes } from "./routes/export";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = fastify({ logger: true });

// Configurar tratamento de erros
app.register(errorHandler);

// Configurar CORS
app.register(cors, {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
});

// Health check
app.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// Registrar rotas da API
app.register(linksRoutes, { prefix: "/api" });
app.register(exportRoutes, { prefix: "/api" });

// Registrar rotas de redirecionamento (sem prefixo para URLs curtas)
app.register(redirectRoutes);

// Configurações do servidor
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 3333;

// Função para iniciar o servidor
const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
