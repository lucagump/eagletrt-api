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
     * /api/v1/views/:view:
     *  get:
     *    description: Use to request a view with all the users of that view
     *  responses:
     *      '200':
     *        description: A successful response
     */
     router.get('/views/:view', RouteController.getView);

    /**
     * @swagger
     * /api/v1/views/users/:userID:
     *  get:
     *    description: Use to request views by specific user
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/views/users/:userID', RouteController.getUsersViews);



    return router;

}