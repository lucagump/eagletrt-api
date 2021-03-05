import * as express from 'express';
import mqttRouter from './mqtt/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use(mqttRouter());

    return router;
}