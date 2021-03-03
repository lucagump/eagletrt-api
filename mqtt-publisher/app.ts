import mqtt from 'mqtt';
import config from './config';
import { helpers } from './functions';

var mqttUri = 'mqtt://' + config.mqttHostname + ':' + config.mqttPort;
var client = mqtt.connect(mqttUri);

client.on('connect', () => {
    console.log('Connecting to topic chimera...')
    client.subscribe(config.topic)
    console.log('Connected!')
    helpers.startStream();
});
