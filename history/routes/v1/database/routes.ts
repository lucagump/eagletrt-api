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

    /**
     * @swagger
     * /api/v1/sessions:
     *  get:
     *    description: This endpoint returns test sessions  
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/collections/:collection/sessions', RouteController.getSessions);

    /**
     * @swagger
     * /api/v1/collections/:collection/session/:session:
     *  get:
     *    description: This endpoint returns test sessions  
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/collections/:collection/sessions/:session', RouteController.getSessionDocuments);

    /**
     * @swagger
     * /api/collections/:collection/sessions/:session/minmax:
     *  get:
     *    description: This endpoint returns minimum and max timestamp in a session  
     *  responses:
     *      '200':
     *        description: A successful response
     */
     router.get('/collections/:collection/sessions/:session/minmax', RouteController.getSessionMinMaxTimestamp);

    /**
     * @swagger
     * /api/v1/:collection/:timestamp:
     *  get:
     *    description: This endpoint returns the data with a certain timestamp
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/data/:collection/:timestamp', RouteController.getByTimestamp);

    /**
     * @swagger
     * /api/v1/data/:collection/:session/:start/:finsh:
     *  get:
     *    description: This endpoint returns the data from a certain timestamp to another
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/data/:collection/:session/:start/:finish', RouteController.getManyFromTimestamp);

    /**
     * @swagger
     * /api/v1/documents/:collection/:id:
     *  get:
     *    description: This endpoint returns the data with a certain id
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/documents/:collection/:id', RouteController.getByID);

    return router;

}