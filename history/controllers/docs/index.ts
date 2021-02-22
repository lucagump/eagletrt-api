import { MongoClient } from 'mongodb'
import { JsonObject } from 'swagger-ui-express';
import config from '../../config'
// import db from '../../loaders/database'

// var MongoClient = mongodb.MongoClient;

// import MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;

// const config = require('./config/config.json');


var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export class DocumentController {

    // Get the documents collection
    public async getByTimestamp() {
                  
    };

    // Get the documents collection
    public async getCollections() {

        // var connection = MongoClient.connect(url,options)
        MongoClient.connect(config.databaseUrl as string, config.databaseConfig, (err, client) => {

            if (err) throw err;
        
            const db = client.db(config.databaseNameTest as string);
        
            db.listCollections().toArray().then((docs) => {
        
                console.log('Available collections:');
                var data: any = []
                docs.forEach((doc, idx, array) => { data.push(doc.name); console.log(doc.name) });
                console.log(data)
                return data;
            }).catch((err) => {
        
                console.log(err);
            }).finally(() => {
        
                client.close();
            });
        }); 
          
    };
    
    public async findOne(collectionName: string,) {

        const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
            .catch(err => { console.log(err); });
    
        if (!client) {
            return;
        }
    
        try {
    
            const db = client.db(config.databaseNameTest as string);
    
            let collection = db.collection(collectionName);
    
            let query = { name: 'Volkswagen' }
    
            let res = await collection.findOne(query);
    
            console.log(res);
    
        } catch (err) {
    
            console.log(err);
        } finally {
    
            client.close();
        }
    }

    public async getByID() {
        
    };

    public async getManyFromTimestamp() {
        
    };
    
    public async getManyByTimestamp() {

    }
}