let mongoServer = require('mongodb').Server;
const url = 'localhost';
let MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const nome_database = 'chimera';
const key = 'data';
let db = undefined;

async function connect(){
    return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost:27017/"+nome_database,function (err, database) {
                if(err) reject(err);
                db = database;
                resolve("Database connesso");
            });
        }
    );
}

async function disconnect(){
    return new Promise((resolve, reject) => {
            try{
                db.close();
                resolve("Database disconnesso");
            }catch(e){
                reject(e);
            }
        }
    );
}

/*
This function inserts a record
 */
async function insertAll(json) {
    return new Promise( (resolve, reject) => {
        const collection = db.collection(key);
        collection.insertOne(json,(err,result)=>{
            if(err){
                reject("Errore nella query");
            }else{
                resolve("Eseguito");
            }
        });

    });
}

/*
This function allow us to remove a record with a certain timestamp.
 */
function removeWithTimestamp(timestamp){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        collection.remove({timestamp}, (result, err) => {
            if(err) reject(err);
            resolve("Eseguito");
        });
    });
}

/*
This function removes a record with objectid(id) = _ID
 */
async function removeWithObjectID(_ID){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        collection.remove({_id: ObjectId(_ID)}, (result, err) => {
            if(err) reject(err);
            resolve("Eseguito");
        });
    });
}

async function selectFromObjectID(ID){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        collection.find({_id: ObjectId(ID)}).toArray(function(result, err){
            if(err) reject(err);
            resolve(result);
        });
    });
}

/*
This function retrieve a record starting from its timestamp
 */
async function selectFromTimestamp(timestamp){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        collection.find({timestamp}).toArray(function(result, err){
            if(err) reject(err);
            resolve(result);
        });
    });
}

/*
This function retrieve all the data with timestamp $in values
 */
async function selectManyFromTimestampValues(values){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        const query = {
            timestamp: {
                $in: values
            }
        };
        collection.find(query).toArray(function(result, err){
            if(err) reject(err);
            resolve(result);
        });
    });
}


/*
This function return all the records with timestamp between start and finish (start and finish included)
 */
async function selectManyFromTimestamp(start, finish){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        const query = {
            timestamp: {
                $gte: start,
                $lte: finish
            }
        };
        collection.find(query).toArray(function(result, err){
            if(err) reject(err);
            resolve(result);
        });
    });
}

/*
This function retrieve the record with id = ID
 */
async function selectFromID(ID){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        collection.find({id: ID}).toArray(function(result, err){
            if(err) reject(err);
            resolve(result);
        });
    });
}


module.exports = {
    insertAll : insertAll,
    connect : connect,
    disconnect:disconnect,
    removeWithTimestamp : removeWithTimestamp,
    selectFromObjectID:selectFromObjectID,
    selectFromID : selectFromID,
    removeWithObjectID:removeWithObjectID,
    selectManyFromTimestamp : selectManyFromTimestamp,
    selectManyFromTimestampValues: selectManyFromTimestampValues,
    selectFromTimestamp : selectFromTimestamp
};