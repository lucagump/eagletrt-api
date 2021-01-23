import * as express from 'express';
import userRouter from './users/routes';

export default function(): express.Router {
    const router = express.Router();

    router.use('/users',userRouter);
    
    // router.use('/users', getUserRouter());
    // router.use('/collections', getCollectionRouter());
    // router.use('/study', getStudyRouter());
    // router.use('/stats', getStatsRouter());

    // router.use('/share', getShareRouter());

    return router;
}