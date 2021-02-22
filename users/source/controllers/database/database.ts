import { connect, connection, Connection } from 'mongoose';
import { User, UserModel } from '../../models';
import config from '../../config'

const dbuser = process.env.DB_USER || "eagletrt";
const dbpassword = process.env.DB_PASSWORD || "eagletrt";
const dbname = process.env.DB_NAME || "eagletrt";

declare interface IModels {
    User: UserModel;

}

export class DB {

    private static instance: DB;
    
    private _db: Connection; 
    private _models: IModels;

    private url = "mongodb+srv://" + config.databaseUser + ":" + config.databasePassword + "@clustertest.yjrwo.mongodb.net/" + dbname + "?retryWrites=true&w=majority"

    private options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    private constructor() {
        connect(this.url, this.options);
        this._db = connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);

        this._models = {
            User: new User().model
            // this is where we initialise all models
        }
    }

    public static get Models() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance._models;
    }

    private connected() {
        console.log('Mongoose has connected');
    }

    private error(error: any) {
        console.log('Mongoose has errored', error);
    }
}