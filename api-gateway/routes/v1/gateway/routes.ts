import express from 'express';

import { RouteController } from './controllers';

export default function (): express.Router {

    const router = express.Router();
    
    /**
     * @swagger
     * /api/v1/collections:
     *  get:
     *    description: This endpoint returns an array with the test-run collections on the database
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/collections', RouteController.getCollections);

    return router;
}