import express from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';

import { RouteController } from './controllers';

const airtableUrl = 'http://localhost:3001/api/v1';
const productUrl = 'http://localhost:3001/api/v1';
const loginRedirectUrl = 'http://localhost:3001/status';
const jwtSigningKey = 'thats_amore_findus'

function getGatewayBearerToken(req: Request) {
    // Recall that we put the User in the session in the previous post, but they might not be logged in so protect this code
    // from a null User. 
    var user = req.session.user;
    var token = jwt.sign({ data: req.url, roles: user !== null ? user.registrations[0].roles : null }, jwtSigningKey, { expiresIn: '10m', subject: 'gateway', issuer: req.get('host') });
    return 'Bearer ' + token;
    }

export default function (): express.Router {

    const router = express.Router();
    
    /**
     * @swagger
     * /api/v1/collections:
     *  get:
     *    description: This endpoint returns an array with the test-run collections on the database
     *  responses:
     *      '200':
     *        description: A successful response
     */
    router.get('/collections', RouteController.getCollections);

    router.get('/airtable', function(req, res, next) {
    //   request(`${airtableUrl}/products`).pipe(res);
        request(`http://google.com`).pipe(res);
    });
        
    router.get('/api', function (req,res) {
            res.json({
                text: 'api',
            });
        });
        
    router.post('/api/login', function(req, res) {
        const user = { id: 3};
        const token = jwt.sign({user}, jwtSigningKey)
        res.json({
            text: 'api',
            token: token
        });
    });
        
    router.get('/api/protected', checkToken, function(req, res) {
        jwt.verify(req.token, jwtSigningKey, function (err: any,data: any) {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json({
                    text: 'api is protected',
                    data: data
                });
            }
        })
    });
        
    function checkToken(req: Request, res: Response, next: any){
        const bearerHeader = req.headers['authorization'];
        console.log(req.headers);
        if (typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            console.log(bearer[0])
            console.log(bearer[1])
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            console.log(bearerHeader)
            res.status(403).json({message: 'gas'});
        }
    }
    
    // Another example with getGatewayBearerToken
    router.get('/products', function(req, res, next) {
        const bearerToken = getGatewayBearerToken(req);
        const options = {
            url: `${productUrl}/products`,
            headers: { authorization: bearerToken }
        };
        request(options).pipe(res);
    });
        
        
    // As a middleware
    // import authMiddleware from './common'
    // router.use(authMiddleware({ jwtSigningKey: jwtSigningKey, loginRedirectUrl: loginRedirectUrl }));
        
    
    return router;

}