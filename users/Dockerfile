FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
COPY . .

FROM base as dev

ARG MODE
ENV NODE_ENV=$MODE
RUN npm install
RUN npm run transpile

EXPOSE 3001

COPY . .
CMD ["node", "dist/index.js"]


