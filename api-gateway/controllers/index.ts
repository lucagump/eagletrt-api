import { GatewayController } from './gateway';
import { JWTController } from './jwt';

const gatewayController = new GatewayController();
const jwtController = new JWTController();

export {
    gatewayController,
    jwtController
};