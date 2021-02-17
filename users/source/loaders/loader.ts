import express  from 'express';
import morgan from 'morgan';
import bodyParser from'body-parser';
import getVersionRouter from '../routes/router';
import path from 'path';
import dotenv from 'dotenv';

import { mdlware ,swaggerUi, swaggerDocs } from './middleware';

export default async ({ app }: { app: express.Application }) => {

    var result = dotenv.config();
    console.log(result.parsed);

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');
  
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
  
    app.use(mdlware);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use(bodyParser.json());   
    
    if(process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));                                         
    }                                  
    
    // Just an Index 
    /**
     * @swagger
     * /:
     *  get:
     *    description: Use to request nothing
     *  responses:
     *      '200':
     *        description: A successful response
     */
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/public/index.html'));
    });
    
    app.use(getVersionRouter);

    const expressport = process.env.DATABASE_SERVICE_PORT || 8080;
    app.listen(expressport, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${expressport}⚡️`);
    });


    // ...More middlewares
  
    // Return the express app
    return app;
  })