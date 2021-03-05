import express from 'express'
import { Loader } from './loaders';
import Logger from './loaders/logger';

import mqtt from 'mqtt';
import { DatabaseController } from './controllers/database';
import config from './config';

const mqttUri = 'mqtt://' + config.mqttHostname + ':' + config.mqttPort;

const client = mqtt.connect(mqttUri);

function normalizePort(val: string | number | undefined, fallback = 3334): number {
    if (typeof val === 'string') {
        const port = parseInt(val, 10);
        if (!isNaN(port) && port > 0)
            return port;
    } else if (typeof val === 'number' && val > 0) {
        return val;
    }
    return fallback;
}

function start(app: express.Application, defPort: number | undefined = undefined) {
    const port = normalizePort(defPort ? defPort : process.env.PORT);

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    // await require('./loaders').default({ expressApp: app });
    Loader.defaultLoader({ app });

    const server = app.listen(port, () => {
        Logger.info(`⚡️[server]: Server is running at https://localhost:${port}⚡️`);

      }).on('error', err => {
        Logger.error(err);
        process.exit(1);
      });
    
    client.on('connect', () => {
        console.log('Connecting to ' + config.topic + '...')
        client.subscribe(config.topic as string, function (err) {
            if (err) {
                console.error('Error in connecting ', err);
            }
            else {
                console.log('live is connected!');
            }
        });
    
    });
    
    client.on('offline', () => {
        client.unsubscribe(config.topic as string);
        console.log('Disconnected from /' + config.topic + '.');
    });
    
    client.on('message', function (_topic, message) {
        try {
            var json = JSON.parse(message.toString()) 
            DatabaseController.insert(json);
        } catch (error) {
            console.log('json bad format', error, message)
        }
    });


    process.on('SIGINT', () => {
        console.log('Killing the server');
        console.log('Connection closed');
        server.close();
        process.exit();
    });
}

// export default app; // for testing
export default function(defPort: number | undefined = undefined) {
    const app = express();
    start(app, defPort);
}




