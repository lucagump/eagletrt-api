import express from 'express';
import { RouteController } from './user.routes.controller';

export const userRouter = express.Router({
    strict: true
});

//middleware

userRouter.get('/users', RouteController.get);
userRouter.get('/users/:userID', RouteController.getByID);

userRouter.post('/users', RouteController.post);
// userRouter.put('/users/:userID', RouteController.update);
// userRouter.delete('/users/:userID', RouteController.delete);
