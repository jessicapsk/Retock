# Estágio de construção
FROM node:16 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de produção (original final stage, renamed for clarity)
FROM nginx:alpine AS production_nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

# Novo estágio final padrão para desenvolvimento
FROM node:16-alpine AS development
WORKDIR /usr/src/app

# Copie package.json e package-lock.json (se disponível)
COPY package*.json ./

# O npm install será executado pelo comando do docker-compose para popular o volume
# COPY . . irá copiar o restante dos arquivos de origem
COPY . .

EXPOSE 3000
# O comando (por exemplo, npm start) será fornecido pelo docker-compose.yml
# Ou você pode adicionar um CMD padrão aqui se desejar:
# CMD ["npm", "start"]