import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não está definida nas variáveis de ambiente");
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });
