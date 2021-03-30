FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
COPY . .

FROM base as dev

ENV NODE_ENV=development
RUN npm install

RUN npm run transpile

EXPOSE 3000

COPY . .
CMD ["node", "dist/index.js"]