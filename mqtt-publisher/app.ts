import mqtt from 'mqtt';
import config from './config';
import { helpers } from './functions';

var mqttUri = 'mqtt://' + config.mqttHostname + ':' + config.mqttPort;
var client = mqtt.connect(mqttUri);

client.on('connect', () => {
    console.log('Connecting to topic /'+ config.topic)
    client.subscribe(config.topic as string)
    console.log('Done')
    helpers.startStream();
});
