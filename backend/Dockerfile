# Estágio de construção
FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Estágio de produção
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

COPY .env* ./

EXPOSE 5000

CMD ["node", "dist/app.js"]