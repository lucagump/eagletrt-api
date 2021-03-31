import express from 'express';
import request from 'request';

import { RouteController } from './controllers';

const airtableUrl = 'http://localhost:3001/api/v1';
const productUrl = 'http://localhost:3001/api/v1';
const loginRedirectUrl = 'http://localhost:3001/status';
const jwtSigningKey = 'thats_amore_findus'

// function getGatewayBearerToken(req: Request) {
//     // Recall that we put the User in the session in the previous post, but they might not be logged in so protect this code
//     // from a null User. 
//     var user = req.session.user;
//     var token = jwt.sign({ data: req.url, roles: user !== null ? user.registrations[0].roles : null }, jwtSigningKey, { expiresIn: '10m', subject: 'gateway', issuer: req.get('host') });
//     return 'Bearer ' + token;
// }

export default function (): express.Router {

    const router = express.Router();

    /**
     * @swagger
     * /api/v1/login:
     *  post:
     *    description: This endpoint is used to login 
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.post('/login', RouteController.login);

    /**
     * @swagger
     * /api/v1/signup:
     *  post:
     *    description: This endpoint is used to signup as a new user
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.post('/signup', RouteController.signup);  
    
    return router;

}