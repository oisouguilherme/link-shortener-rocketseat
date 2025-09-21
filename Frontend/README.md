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

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── CreateLinkForm.tsx
│   └── LinksList.tsx
├── pages/              # Páginas da aplicação
│   ├── Home/
│   ├── NotFound/
│   └── Redirect/
├── hooks/              # Custom hooks
│   └── useLinks.ts
├── services/           # Configuração de APIs
│   └── api.ts
├── types/              # Tipos TypeScript
│   ├── api.ts
│   └── validation.ts
└── assets/             # Ícones e recursos
    └── Icons.tsx
```

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

## 🔗 Integração com Backend

O frontend consome as seguintes APIs:

| Endpoint                  | Uso          |
| ------------------------- | ------------ |
| `POST /api/links`         | Criar link   |
| `GET /api/links`          | Listar links |
| `DELETE /api/links/:code` | Deletar link |
| `POST /api/export`        | Exportar CSV |

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## 🎨 Design System

- **Cores**: Sistema baseado em tons de cinza e azul
- **Tipografia**: Font system nativa do browser
- **Spacing**: Sistema de espaçamento Tailwind
- **Responsividade**: Mobile-first approach

---

**Desenvolvido para o desafio da Rocketseat** 🚀
