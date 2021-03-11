import express from 'express';
import { RouteController } from './controllers';

export default function (): express.Router {

    const router = express.Router();

    /**
     * @swagger
     * /api/v1/views:
     *  get:
     *    description: Use to request all the views available
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/views', RouteController.get);
    
    /**
     * @swagger
     * /api/v1/views/users/:username:
     *  get:
     *    description: Use to request views by specific user
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/views/users/:username', RouteController.getUsersViews);

    return router;

}