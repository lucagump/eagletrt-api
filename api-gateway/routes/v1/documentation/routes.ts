import express from 'express';

import { RouteController } from './controllers';
import { jwtController } from '../../../controllers';

export default function (): express.Router {

    const router = express.Router();
    router.use("/documentation", jwtController.auth);
    
    /**
     * @swagger
     * /api/v1/documentation/:microservice:
     *  get:
     *    description: This endpoint returns the documentation requested with the parameter
     *  responses:
     *      '301':
     *        description: A successful response
     */
    router.get('/documentation/:microservice', RouteController.redirectDocumentation);
    
    return router;

}