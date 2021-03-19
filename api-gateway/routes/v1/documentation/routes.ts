import express from 'express';
import request from 'request';

import { RouteController } from './controllers';

export default function (): express.Router {

    const router = express.Router();
    
    /**
     * @swagger
     * /api/v1/documentation/:microservice:
     *  get:
     *    description: This endpoint returns the documentation requested with the parameter
     *  responses:
     *      '301':
     *        description: A successful response
     */
    router.get('/documentation/:microservice', RouteController.redirectDocumentation);


    /**
     * @swagger
     * /api/v1/example/google:
     *  get:
     *    description: This endpoint is an example to forward the requests from the microservice
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/example/google', function(req, res, next) {
    //   request(`${airtableUrl}/products`).pipe(res);
        request(`http://google.com`).pipe(res);
    });
    
    return router;

}