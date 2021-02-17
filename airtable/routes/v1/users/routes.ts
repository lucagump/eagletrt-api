import express from 'express';
import { RouteController } from './controllers';

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
    
    /**
     * @swagger
     * /v1/users:
     *  post:
     *    description: Use to update a user
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
     *        description: Successfully updated user
     */
    router.put('/users/:userID', RouteController.update);
    
    /**
     * @swagger
     * /v1/users:
     *  post:
     *    description: Use to delete a user
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
     *        description: Successfully deleted user
     */
    router.delete('/users/:userID', RouteController.deleteUser);

    return router;

}