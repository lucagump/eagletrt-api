import joi from 'joi';
import { ObjectId } from 'mongodb';
// --- INTERFACES ---

export interface DBObject {
    _id?: string | ObjectId;
    createdOn: Date;
    lastModified: Date;
}

export interface User {
    _id?: string | ObjectId,
    username: string;
    displayName: string;
    email: string;
}

export interface DBUserDoc extends User, DBObject {
    password: string,
    deletedOn: Date | null
}

// --- VAlIDATORS ---
export function validateUser(user: unknown): { value?: User, error?: string } {

    const validationResult = joi.object({
        _id: joi.string(),
        username: joi.string().min(6).required(),
        displayName: joi.string().min(6).required(),
        email: joi.string().email().required(),
    }).validate(user);

    if (validationResult.error) {
        return { error: validationResult.error.message };
    }
    
    return { value: (user as User) };
}

// --- DB parsers ---
export function getUserFromDBDoc(doc: DBUserDoc): User {
    return {
        displayName: doc.displayName,
        email: doc.email,
        username: doc.username
    };
}