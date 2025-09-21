const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  const client = await pool.connect();

  try {
    // Criar a tabela links
    await client.query(`
      CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "original_url" text NOT NULL,
        "short_code" text NOT NULL,
        "access_count" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
      );
    `);

    // Criar índices
    await client.query(`
      CREATE INDEX IF NOT EXISTS "short_code_idx" ON "links" USING btree ("short_code");
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS "created_at_idx" ON "links" USING btree ("created_at");
    `);

    console.log('✅ Tabela "links" criada com sucesso!');

    // Verificar se a tabela foi criada
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'links';
    `);

    if (result.rows.length > 0) {
      console.log('✅ Tabela "links" confirmada no banco de dados');
    } else {
      console.log('❌ Tabela "links" não foi encontrada');
    }
  } catch (error) {
    console.error("❌ Erro ao criar tabela:", error);
  } finally {
    client.release();
    pool.end();
  }
}

createTable();
