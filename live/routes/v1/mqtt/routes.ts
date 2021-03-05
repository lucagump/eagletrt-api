import express from 'express';
import { RouteController } from './controllers';

export default function (): express.Router {

    const router = express.Router();
    
    /**
     * @swagger
     * /api/v1/configuration:
     *  get:
     *    description: This endpoint returns a Json with the configuration of the mqtt client
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/configuration', RouteController.getConfiguration);

    return router;

}