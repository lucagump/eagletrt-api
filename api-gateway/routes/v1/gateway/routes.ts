import express from 'express';

import { RouteController } from './controllers';
import { jwtController } from '../../../controllers';

export default function (): express.Router {

    const router = express.Router();
    router.use("/views", jwtController.auth);
    
    /**
     * @swagger
     * /api/v1/views/:username:
     *  get:
     *    description: This endpoint returns a json with the views for a specific user
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/views/:username', RouteController.getViews);

    return router;
}