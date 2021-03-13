import express  from 'express';
import Logger from './logger';
import expressLoader from './express';
import {swaggerUi, swaggerDocs} from './swagger/docs';

// export default async ({ app }: { app: express.Application }) => {
export module Loader {
    export async function defaultLoader({ app }: { app: express.Application }){
        expressLoader({app});
        Logger.info('✌️ Express loaded');
        
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        Logger.info('✌️ SwaggerUI loaded');

    }
}
