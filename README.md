[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/lucagump/eagletrt-api/blob/main/LICENSE)

# eagletrt-api
This project consists of an [express](https://expressjs.com/) rest API server written in Typescript.
It's a cloud-based application. It's built with different microservices developed with Node Js, Docker, NGINX, MongoDB and MQTT. The project is up and running (_i hope_) [here](https://theuselessweb.com/).


## Project Structure (Draft Version)

![SchemaOverview](documents/draft-version.PNG)

## Todo 

+ [ ] Fix port from config
+ [ ] Authentication
+ [ ] New Tests
+ [ ] Joi Airtable
+ [ ] Check NGINX configuration 
+ [ ] Heroku CI
+ [X] Dockerfile
+ [X] docker-compsoe.yml

## Config

Clone the repository, install the module and place the .env file with tokens and variables. 

## Authentication

_To Do_

## History

The History microservice is used to serve the webapp with all the documents, data of the vehicle. This microservice consists of and adapter layer to get the information from a schema-less database (MongoDB on Atlas and inside the University of Trento)

## Airtable

The Airtable microservice is used to serve the webapp with all the information about the user and their personalized views based on their role. This microservice consists of and adapter layer to get the information from a Airtable.

## Live

The Live microservice is used to insert the documents/data sent from the vehicle. This microservice consists of proxy for the messages receive on the vehicle _topic_. The broker is _broker.mqttdashboard.com_.

## MQTT Publisher

The MQTT Publisher microservice is to intend as a _test_ service to emulate the condition of the car which is sending data to the online platform.

### Env Files
Place the `.env` file in each root of the microservices.<br>
The test file should be called `.env.test` and it's used during local tests.<br>

`.env`
```
PORT=3333
DB_NME=dbname
DB_HOSTNAME=<insert-your-connection-string>
```

## API Documentation 

The complete generated document of the API is available [here](https://documenter.getpostman.com/view/3504740/TVCjx5xT#33c906b0-350f-4e19-a0e6-09d6a9aab648). It's possible to check the documentation of each microservices on the route _/api-docs_ 

## Report

![SchemaExample](documents/to-do.png)

The [report ](https://github.com/lucagump/eagletrt-api/blob/main/documents/report.pdf) is in the /documents folder  

## Docker Compose

In the root folder run:

`docker`
```
npm start
```

This command should build and run the microservices with the reverse proxy, each route is for now accessible. Further development will only expose the client routes in order to serve the web-app

## Scripts cheetsheet
The application come with several npm scripts:
* `npm serve` - Transpile and run the application in one command
* `npm start` - Start the app with nodemon
* `npm transpile` - Transpile the typescript file to javascript
* `npm commit` - Commit with commitizen
* `npm commit:sign` - Signed commit with commitizen
* `npm test` - Transpile the application and run all the tests
