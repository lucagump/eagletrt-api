FROM node:12.17.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node:12.17.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm start


# FROM node:12-alpine //I used a alpine of a node image
# WORKDIR /var/www //or where you want your application to be in your container - some developers prefer /app
# COPY ./package*.json .
# RUN npm install
# COPY ..
# CMD ["npm", "start"]
# EXPOSE 3010 //Expose this port for the server to use

# version: '3'
# services:
# api:
#    volumes:
#    - /var/www/node_modules //Does not mount node_modules folder from local machine
#    - :/var/www //Mount local machine folder to container
#    container_name: typscript_nodeserver
#    restart: unless-stopped
#    build:
#       context: ./
#       dockerfile: ./Dockerfile
#    working_dir: /var/www
#    ports:
#       - "3010:3010" //handles port forwarding so local machine can use