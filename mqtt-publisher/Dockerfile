FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
COPY . .

FROM base as dev

ENV NODE_ENV=development
RUN npm install -g concurrently && npm install

COPY . .
CMD ["npm", "start"]


