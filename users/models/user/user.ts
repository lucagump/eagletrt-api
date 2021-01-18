import { Schema, model, Document, Model } from 'mongoose';

declare interface IUser extends Document{
    name: string;
    email: string;
    phone?: string;
    creation_date: Date;
}

export interface UserModel extends Model<IUser> {};

export class User {

    private _model: Model<IUser>;

    constructor() {
        const schema =  new Schema({
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
            creation_date: { type: Date, default: Date.now }
        });

        this._model = model<IUser>('User', schema);
    }

    public get model(): Model<IUser> {
        return this._model
    }
}