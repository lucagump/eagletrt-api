import express  from 'express';
import mqtt from 'mqtt';
import config from '../config'
import Logger from './logger';
import expressLoader from './express';
import mqttLoader from './mqtt';
import {swaggerUi, swaggerDocs} from './swagger/docs';

export module Loader {
    export async function defaultLoader({ app }: { app: express.Application }){
        expressLoader({app});
        Logger.info('✌️ Express loaded');

        const mqttUri = 'mqtt://' + config.mqttHostname + ':' + config.mqttPort;
        const client = mqtt.connect(mqttUri);
        mqttLoader({client})
        Logger.info('✌️ MQTT loaded');
        
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        Logger.info('✌️ SwaggerUI loaded');

    }
}
