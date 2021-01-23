import express from 'express';
import { RouteController } from './user.routes.controller';

export default function (): express.Router {

    const router = express.Router();

    /**
     * @swagger
     * /v1/users:
     *  get:
     *    description: Use to request all users
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/users', RouteController.get);

    /**
     * @swagger
     * /v1/users/:userID:
     *  get:
     *    description: Use to request a user
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/users/:userID', RouteController.getByID);

    /**
     * @swagger
     * /v1/users:
     *  post:
     *    description: Use to add a user
     *  parameters:
     *    - name: users
     *      in: query
     *      description: Name of our user
     *      required: false
     *      schema:
     *        type: string
     *        format: string
     *  responses:
     *      '200':
     *        description: Successfully created user
     */
    router.post('/users', RouteController.post);

    // userRouter.put('/users/:userID', RouteController.update);
    // userRouter.delete('/users/:userID', RouteController.delete);

    return router;

}