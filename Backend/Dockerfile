# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários para o container
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta da aplicação
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]