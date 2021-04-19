import { MongoClient } from 'mongodb'
import config from '../../config'

// const client = new MongoClient(config.databaseUrl as string, config.databaseConfig);

export class DocumentController {

    // Get the collection
    public async getCollections(pageSize: any = undefined, pageIndex : any = undefined) {

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
            // Late paging, probably faster, but needs the whole collection loaded. sorry luca
            if (pageSize != undefined) {
                if (!Number.isInteger(pageSize) || !Number.isInteger(pageIndex)) throw new Error();
                if (pageSize < 0 || pageIndex < 0) throw new Error();
                var upper: number = Math.min(data.length-1, (pageIndex+1) * pageSize);
                var lower: number = Math.min(data.length-1, pageIndex * pageSize);
                data = data.slice(lower, upper);
            }
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
            var data = await collection.find(query).sort({timestamp:1}).toArray();

            return data
        } catch (error) {
            return {"error":"Database query error"}
        } finally {
            await client.close();
        }            
    };

        // Get minimum and max timestamp in a session
        public async getSessionMinMaxTimestamp(collectionName: string,session: string) {

            const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
                .catch(err => { console.log(err); });
    
            if (!client) {
                console.log('error')
                return {"error":"Database connection error"}
            }
    
            try {
                const db = client.db(config.databaseNameTest as string);
                var collection = db.collection(collectionName);
                
                const pipeline = [
                    {
                        '$match': {
                            'sessionName': session,
                            'id': { $ne : undefined}
                        }
                    },
                    {
                        '$project': {
                            'timestamp': 1,
                        }
                    },
                    {
                        '$group': {
                            "_id": null,
                            'min': { '$min': '$timestamp' },
                            'max': { '$max': '$timestamp' }
                        }
                    }
                ];

                var data = await collection.aggregate(pipeline).toArray();

                return { 
                    min: data[0].min,
                    max: data[0].max
                }
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
    public async getManyFromTimestamp(collectionName: string, session: string, start: Number, finish: Number) {
        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
        .catch(err => { console.log(err); });

        if (!client) {
            console.log('error')
            return {"error":"Database connection error"}
        }

        try {
            const db = client.db(config.databaseNameTest as string);
            var collection = db.collection(collectionName);

            const pipeline = [
                {
                    '$match': {
                        'sessionName': session,
                        'id': { $ne : undefined}
                    }
                },
                {
                    '$match': {
                        'timestamp': {
                            $gte: start,
                            $lte: finish
                        }
                    }
                }
            ];

            var data = await collection.aggregate(pipeline).toArray();

            return data
        } catch (error) {
            console.log(error)
            return {"error":"Database query error"}
        } finally {
            await client.close();
        } 
    };
}