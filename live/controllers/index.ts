import { MQTTController } from './mqtt';
import { DatabaseController } from './database';

const mqttController = new MQTTController();
const databaseController = new DatabaseController();

export {
    mqttController,
    databaseController
};