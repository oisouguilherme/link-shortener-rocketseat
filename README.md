# 🎨 Link Shortener - Frontend

> Desafio da Pós-Graduação Rocketseat

Interface web para encurtar URLs desenvolvida com **React**, **TypeScript**, **React Query** e **Vite**.

## 🚀 Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Interface rodando em: `http://localhost:5173`

> ⚠️ **Importante**: O backend deve estar rodando em `http://localhost:3333`

## 📋 Funcionalidades

✅ **Criar links encurtados**

- Formulário com validação em tempo real
- Código personalizado ou automático
- Preview do link encurtado

✅ **Listar links**

- Lista com paginação
- Contador de acessos
- Botões de ação (copiar/deletar)

✅ **Redirecionamento**

- Tela de loading antes do redirecionamento
- Tratamento de erros 404

✅ **Exportar dados**

- Download de CSV via AWS S3
- Feedback visual do processo

✅ **UX/UI responsiva**

- Design mobile-first
- Estados de loading e erro
- Feedback de interações

## 🛠️ Stack Técnica

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de dados
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização

## 🎯 Principais Componentes

### **CreateLinkForm**

- Formulário de criação de links
- Validação com Zod + React Hook Form
- Estados de loading e erro
- Preview do link gerado

### **LinksList**

- Lista paginada de links
- Ações de copiar e deletar
- Exportação de CSV
- Feedback visual

### **Redirect**

- Tela de redirecionamento
- Loading state
- Tratamento de erros

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

## 🐳 Docker

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
