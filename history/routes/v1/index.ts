import * as express from 'express';
import databaseRouter from './database/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use(databaseRouter());

    return router;
}