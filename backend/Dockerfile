FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Use nodemon or ts-node-dev for development
CMD ["npm", "run", "dev"]