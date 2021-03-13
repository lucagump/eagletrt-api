import * as express from 'express';
import gatewayRouter from './gateway/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use(gatewayRouter());

    return router;
}