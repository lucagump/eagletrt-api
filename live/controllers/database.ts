import { MongoClient } from 'mongodb'
import config from '../config'

export module DatabaseController {
    // Insert document in the defeault collection
    export async function insertDocumentInCollection(obj: any) {

        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
            .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            await db.insertOne(obj);

        } catch (error) {
            return {"error":"Database insert error"}
        } finally {
            await client.close();
        }            
    };
}
