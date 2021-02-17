import * as express from 'express';
import userRouter from './users/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use(userRouter());

    return router;
}