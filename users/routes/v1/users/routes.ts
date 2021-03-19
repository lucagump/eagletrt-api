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
     * /api/v1/users/username/:username:
     *  get:
     *    description: Use to request a user by the username
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/users/username/:username', RouteController.getUserByUsername);

    /**
     * @swagger
     * /api/v1/users:
     *  post:
     *    description: Use to insert a user
     *  responses:
     *      '201':
     *        description: A successful response
     */
    router.post('/users', RouteController.post);

    /**
     * @swagger
     * /api/v1/users/:userID:
     *  put:
     *    description: Use to update user jwt and password
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

    /**
     * @swagger
     * /api/v1/users/:userID:
     *  put:
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
         router.put('/users/:userID/token', RouteController.updateToken);

    /**
     * @swagger
     * /api/v1/users:
     *  delete:
     *    description: Use to insert a user
     *  responses:
     *      '201':
     *        description: A successful response
     */
    router.delete('/users/:username', RouteController.deleteUser);
    
    return router;

}