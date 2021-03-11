import * as express from 'express';
import viewRouter from './views/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use(viewRouter());

    return router;
}