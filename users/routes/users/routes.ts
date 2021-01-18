import express from 'express';
import { userController } from '../../controllers';

export const userRouter = express.Router({
    strict: true
});

//middleware

userRouter.get('/users', userController.read);
userRouter.get('/users/:userID', userController.readOne);

userRouter.post('/users', userController.create);
userRouter.put('/users/:userID', userController.update);
// userRouter.delete('/users/:userID', userController.delete);
