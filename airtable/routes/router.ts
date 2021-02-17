import * as express from 'express';
import getV1Router from './v1';

export default function(): express.Router {
    const router = express.Router();
    router.use('/v1', getV1Router());
    router.get('/v1', function (req, res) {
        res.send('Hello World from API V1');
     })
    return router;
}