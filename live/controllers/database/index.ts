import { MongoClient } from 'mongodb'
import config from '../../config'

export module DatabaseController {
    export async function insert(obj: any){
        const client = new MongoClient(config.databaseUrl as string, config.databaseConfig);
        try {
            await client.connect();
            await client.db(config.databaseNameTest as string).collection(config.databaseCollectionTest as string).insertOne(obj);
        } catch (error) {
            console.log(error)
        } finally {
            await client.close();
        }
    }
}
