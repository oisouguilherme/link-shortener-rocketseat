# Link Shortener Backend

Backend para aplicação de encurtamento de URLs desenvolvido com TypeScript, Fastify, Drizzle ORM e PostgreSQL.

## 🚀 Funcionalidades

- ✅ Criar links encurtados
- ✅ Validação de URL e formato de código
- ✅ Prevenção de códigos duplicados
- ✅ Deletar links
- ✅ Obter URL original através do código encurtado
- ✅ Listar todos os links com paginação
- ✅ Incrementar contador de acessos automaticamente
- ✅ Exportar links para CSV
- ✅ Upload automático do CSV para S3/CDN
- ✅ CORS habilitado para frontend

## 🛠️ Tecnologias

- **TypeScript** - Linguagem principal
- **Fastify** - Framework web
- **Drizzle ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **AWS S3** - Storage para arquivos CSV
- **Zod** - Validação de dados
- **Nanoid** - Geração de IDs únicos

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta AWS com S3 configurado (para exportação CSV)

## ⚙️ Instalação

1. Clone o repositório e navegue para o diretório do backend:

```bash
cd Backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/link_shortener
PORT=3333
HOST=0.0.0.0
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
APP_URL=http://localhost:3333
CORS_ORIGIN=http://localhost:5173
```

5. Execute as migrações do banco:

```bash
npm run db:migrate
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🐳 Docker

### Usando Docker Compose (Recomendado para desenvolvimento)

```bash
docker-compose up -d
```

Isso irá iniciar:

- PostgreSQL na porta 5432
- API na porta 3333

### Build da imagem Docker

```bash
docker build -t link-shortener-backend .
```

## 📚 API Endpoints

### Links

#### Criar Link

```http
POST /api/links
Content-Type: application/json

{
  "originalUrl": "https://example.com",
  "shortCode": "abc123" // opcional
}
```

#### Listar Links

```http
GET /api/links?page=1&limit=10
```

#### Deletar Link

```http
DELETE /api/links/:shortCode
```

#### Incrementar Acesso

```http
PATCH /api/links/:shortCode/access
```

### Redirecionamento

#### Acessar Link Encurtado

```http
GET /:shortCode
```

Redireciona para a URL original e incrementa o contador.

### Exportação

#### Exportar CSV

```http
GET /api/export/csv
```

Retorna URL do arquivo CSV no S3.

### Health Check

```http
GET /health
```

## 📊 Estrutura do Banco

A tabela `links` possui os seguintes campos:

- `id` - ID único (serial)
- `original_url` - URL original (text)
- `short_code` - Código encurtado único (text)
- `access_count` - Contador de acessos (integer, default 0)
- `created_at` - Data de criação (timestamp)
- `updated_at` - Data de atualização (timestamp)

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Faz build da aplicação
- `npm start` - Inicia servidor de produção
- `npm run db:generate` - Gera novas migrações
- `npm run db:migrate` - Executa migrações
- `npm run db:studio` - Abre Drizzle Studio

## 🚀 Deploy

1. Faça build da aplicação:

```bash
npm run build
```

2. Configure as variáveis de ambiente no seu provedor
3. Execute as migrações:

```bash
npm run db:migrate
```

4. Inicie a aplicação:

```bash
npm start
```

## 📝 Licença

MIT
