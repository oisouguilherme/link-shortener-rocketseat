# 🔗 Link Shortener - Backend

> Desafio da Pós-Graduação Rocketseat

API para encurtar URLs desenvolvida com **TypeScript**, **Fastify**, **Drizzle ORM** e **PostgreSQL**.

## 🚀 Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

#### Opção A: Com Docker (Recomendado)

```bash
# Subir PostgreSQL via Docker
docker run --name postgres-linkshortener \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=link_shortener \
  -p 5432:5432 \
  -d postgres:15

# Executar migração
npm run db:migrate
```

#### Opção B: PostgreSQL local

```bash
# Criar banco PostgreSQL
createdb link_shortener

# Executar migração
npm run db:migrate
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/link_shortener
PORT=3333
APP_URL=http://localhost:3333
CORS_ORIGIN=http://localhost:5173
```

### 4. Iniciar servidor

```bash
npm run dev
```

Servidor rodando em: `http://localhost:3333`

## 📋 Funcionalidades

✅ **Criar link encurtado**

- POST `/api/links`
- Código personalizado ou automático

✅ **Listar links**

- GET `/api/links`
- Paginação inclusa

✅ **Deletar link**

- DELETE `/api/links/:shortCode`

✅ **Redirecionamento**

- GET `/:shortCode`
- Incrementa contador automaticamente

✅ **Exportar CSV**

- POST `/api/export`
- Upload automático para AWS S3

✅ **Página 404**

- Links inexistentes redirecionam para frontend

## 🛠️ Stack Técnica

- **TypeScript** - Linguagem
- **Fastify** - Framework web
- **Drizzle ORM** - Banco de dados
- **PostgreSQL** - Storage
- **Docker** - Containerização (opcional)
- **AWS S3** - Arquivos CSV
- **Zod** - Validação

## � API Endpoints

| Método | Rota               | Descrição    |
| ------ | ------------------ | ------------ |
| POST   | `/api/links`       | Criar link   |
| GET    | `/api/links`       | Listar links |
| DELETE | `/api/links/:code` | Deletar link |
| GET    | `/:code`           | Redirecionar |
| POST   | `/api/export`      | Exportar CSV |

## 🧪 Testando

```bash
# Criar link
curl -X POST http://localhost:3333/api/links \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://google.com"}'

# Acessar link
curl http://localhost:3333/abc123
```

## 🐳 Docker (Opcional)

Se preferir, você pode rodar apenas o PostgreSQL via Docker:

```bash
# Subir banco
docker run --name postgres-linkshortener \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=link_shortener \
  -p 5432:5432 \
  -d postgres:15

# Parar banco
docker stop postgres-linkshortener

# Reiniciar banco
docker start postgres-linkshortener
```

---

**Desenvolvido para o desafio da Rocketseat** 🚀
