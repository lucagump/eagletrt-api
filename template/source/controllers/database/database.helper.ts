import { Collection, Db, MongoClient } from 'mongodb';

let connection: MongoClient | null = null;
async function connect(): Promise<MongoClient> {
    connection = await (new MongoClient(process.env.DB_HOSTNAME as string, { useUnifiedTopology: true }).connect());
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

function getDb(db: string = process.env.DB_NAME as string): Db {
    if (connection === null) {
        throw new Error('Connection not found');
    }
    return connection?.db(db);
}

function getCollection(
    collection: 'users' | 'history' | 'tests' ): Collection {
    return getDb().collection(collection);
}

export default {
    connect: connect,
    getConnection: getConnection,
    closeConnection: closeConnection,
    getDb: getDb,
    getCollection: getCollection,
};

