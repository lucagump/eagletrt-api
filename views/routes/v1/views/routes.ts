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
     *        description: Data with all the views available
     */
    router.get('/views', RouteController.get);
    
    /**
     * @swagger
     * /api/v1/views/users/:username:
     *  get:
     *    description: Use to request views by specific user
     *  responses:
     *      '200':
     *        description: Username and data as array with all the user views
     *      '404':
     *        description: Username and data empty
    */
    router.get('/views/users/:username', RouteController.getUsersViews);

    return router;

}