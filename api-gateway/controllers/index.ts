import { AuthController } from './authentication';
import { JWTController } from './jwt';
import { APIController } from './api-controller';

const authController = AuthController;
const jwtController = JWTController;
const apiController = APIController;

export {
    authController,
    jwtController,
    apiController
};