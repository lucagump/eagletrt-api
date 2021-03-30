import { DocumentController } from './docs';
import { JWTController } from './jwt';

const historyController = new DocumentController();
const jwtController = JWTController;

export {
    jwtController,
    historyController
};