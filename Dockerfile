FROM node:10-stretch-slim

WORKDIR /app

COPY package*.json ./

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

USER root

RUN npm install --no-optional

CMD npm run start