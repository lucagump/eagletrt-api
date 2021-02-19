import express from 'express';
import { RouteController } from './controllers';

export default function (): express.Router {

    const router = express.Router();

    /**
     * @swagger
     * /api/v1/data/:timestamp:
     *  get:
     *    description: This endpoint returns the data with a certain timestamp
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/data/:timestamp', RouteController.getByTimestamp);

    /**
     * @swagger
     * /api/v1/data/collection/:start/:finsh:
     *  get:
     *    description: This endpoint returns the data from a certain timestamp to another
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/data/collection/:start/:finish', RouteController.getManyFromTimestamp);

    /**
     * @swagger
     * /api/v1/data/collection/multiples:
     *  get:
     *    description: This endpoint returns the data for multiple timestamps
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/data/collection/multiples', RouteController.getManyByTimestamp);

    /**
     * @swagger
     * /api/v1/documents/:id:
     *  get:
     *    description: This endpoint returns the data with a certain id
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/documents/:id', RouteController.getByID);

    return router;

}