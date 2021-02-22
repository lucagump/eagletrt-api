import { MongoClient } from 'mongodb';

import config from '../../config';

let connection: MongoClient | null = null;

export default async (): Promise<MongoClient> => {
    connection = await (new MongoClient(config.databaseUrl as string, { useUnifiedTopology: true }).connect());
    return connection;
}