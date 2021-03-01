FROM node:10-stretch-slim

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn build

RUN npm install -g serve

ARG PORT

CMD serve -s build -l ${PORT}