# syntax = docker/dockerfile:1.2

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN --mount=type=secret,id=serviceAccountFirebase_json,dst=/etc/secrets/serviceAccountFirebase.json

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 1337

CMD [ "npm", "start" ]