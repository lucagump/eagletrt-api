import mqtt from 'mqtt';
import { DatabaseController } from './controllers/database';
import config from './config';
import { deserialize } from 'bson';

const mqttUri = 'mqtt://' + config.mqttHostname + ':' + config.mqttPort;

const client = mqtt.connect(mqttUri);

client.on('connect', () => {
    console.log('Connecting to ' + config.topic + '...')
    client.subscribe(config.topic, function (err) {
        if (err) {
            console.error('Error in connecting ', err);
        }
        else {
            console.log('Connected!');
        }
    });

});

client.on('offline', () => {
    client.unsubscribe(config.topic);
    console.log('Disconnected from /' + config.topic + '.');
});

client.on('message', function (_topic, message) {
    try {
        // const json = deserialize(message);
        // var json = message.toJSON()
        // var json = JSON.stringify(message)
        var json = message.toString('utf8')
        DatabaseController.insertDocumentInCollection(json);
    } catch (error) {
        console.log('json bad format', error, message)
    }
});