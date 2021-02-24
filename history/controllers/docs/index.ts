import { MongoClient } from 'mongodb'
import config from '../../config'

// const client = new MongoClient(config.databaseUrl as string, config.databaseConfig);

export class DocumentController {

    // Get the collection
    public async getCollections() {

        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
            .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var data = await db.listCollections().toArray();
            var response: any  = []
            data.forEach(element => {
                response.push(element.name)
            });
            return response
        } catch (error) {
            return {"error":"Database query error"}
        } finally {
            await client.close();
        }            
    };

    // Get sessions
    public async getSessions(collectionName: string) {

        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
            .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var collection = db.collection(collectionName);
            
            const query = {
                'id': undefined,
            };
            
            var data = await collection.find(query).toArray();
            var response: any  = []
            data.forEach(element => {
                response.push(element.sessionName)
            });

            return response
        } catch (error) {
            return {"error":"Database query error"}
        } finally {
            await client.close();
        }            
    };

    // Get session documents
    public async getSessionDocuments(collectionName: string,session: string) {

        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
            .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var collection = db.collection(collectionName);
            
            const query = {
                'sessionName': session,
                'id': { $ne : undefined}
            };
            var data = await collection.find(query).toArray();

            return data
        } catch (error) {
            return {"error":"Database query error"}
        } finally {
            await client.close();
        }            
    };

    // Get document with a certain timestamp 
    public async getByTimestamp(collectionName: string, timestamp: Number) {
        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
        .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var collection = db.collection(collectionName);
            var res = await collection.findOne({timestamp: timestamp});
            
            return res
        } catch (error) {
            console.log(error)
            return {"error":"Database query error"}
        } finally {
            await client.close();
        } 
    };
    
    // Get Document by the ID
    public async getByID(collectionName: string, id: Number) {
        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
        .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var collection = db.collection(collectionName);
            var res = await collection.findOne({id: id});
            
            return res
        } catch (error) {
            console.log(error)
            return {"error":"Database query error"}
        } finally {
            await client.close();
        } 
    };

    // Get Documents by interval of values
    public async getManyFromTimestamp(collectionName: string, start: Number, finish: Number) {
        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
        .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var collection = db.collection(collectionName);
            const query = {
                timestamp: {
                    $gte: start,
                    $lte: finish
                }
            };
            var data = await collection.find(query).toArray();
            return data
        } catch (error) {
            console.log(error)
            return {"error":"Database query error"}
        } finally {
            await client.close();
        } 
    };
}