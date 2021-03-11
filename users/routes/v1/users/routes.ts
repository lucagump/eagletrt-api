import express from 'express';
import { RouteController } from './controllers';

export default function (): express.Router {

    const router = express.Router();

    /**
     * @swagger
     * /api/v1/users:
     *  get:
     *    description: Use to request all users
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/users', RouteController.get);

    /**
     * @swagger
     * /api/v1/users/:userID:
     *  get:
     *    description: Use to request a user
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/users/:userID', RouteController.getByID);

    /**
     * @swagger
     * /api/v1/users/:userID:
     *  post:
     *    description: Use to update user jwt
     *  parameters:
     *    - name: users
     *      in: query
     *      description: Name of our user
     *      required: false
     *      schema:
     *        type: string
     *        format: string
     *  responses:
     *      '201':
     *        description: Successfully updated user
     */
    router.put('/users/:userID', RouteController.update);
    
    return router;

}