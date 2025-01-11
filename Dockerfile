FROM node:20.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 1337

CMD [ "npm", "start" ]