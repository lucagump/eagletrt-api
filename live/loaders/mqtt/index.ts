import mqtt from 'mqtt';
import config from '../../config'
import { databaseController } from '../../controllers';

export default ({ client }: { client: mqtt.Client }) => {

    client.on('connect', () => {
        client.subscribe(config.topic as string)
    });

    client.on('offline', () => {
        client.unsubscribe(config.topic as string);
        console.log('Disconnected from /' + config.topic + '.');
    });

    client.on('message', function (_topic, message) {
        try {
            var json = JSON.parse(message.toString()) 
            databaseController.insert(json);
        } catch (error) {
            console.log('json bad format', error, message)
        }
    });
};
