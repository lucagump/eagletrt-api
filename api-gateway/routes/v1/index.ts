import * as express from 'express';
import gatewayRouter from './gateway/routes';
import docsRouter from './documentation/routes';
import authenticationRouter from './authentication/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use(gatewayRouter());
    router.use(docsRouter());
    router.use(authenticationRouter());
    return router;
}