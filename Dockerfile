# syntax = docker/dockerfile:1.2

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN --mount=type=secret,id=serviceAccountFirebase_json,dst=/etc/secrets/serviceAccountFirebase.json cat /etc/secrets/serviceAccountFirebase.json

CMD ["sh", "-c", "ls -la /etc/secrets && node server.js"]

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 1337

CMD [ "npm", "start" ]