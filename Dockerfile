FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt


COPY . .

EXPOSE 5555



CMD ["node", "index.js"]