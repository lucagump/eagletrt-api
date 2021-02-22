import { Collection, Db, MongoClient } from 'mongodb';
import config from '../../config';


let connection: MongoClient | null = null;
async function connect(): Promise<MongoClient> {
    connection = await (new MongoClient(config.databaseUrl as string, { useUnifiedTopology: true }).connect());
    return connection;
}

function getConnection(): MongoClient {
    if (connection === null) {
        throw new Error('Connection not found');
    }
    return connection;
}

function closeConnection(): void {
    connection?.close();
    connection = null;
}

export default {
    connect: connect,
    getConnection: getConnection,
    closeConnection: closeConnection
};

