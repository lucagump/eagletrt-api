import joi from 'joi';

interface NewUser {
    name: string;
    surname: string;
    username: string;
    password: string;
    jwt: string;
    email: string;
    newPassword: string;
}

interface UpdateUser {
    id: string;
    password: string;
    jwt: string;
}
interface UpdateToken {
    id: string;
    password: string;
    jwt: string;
}

export module AuthModels {

    export function validateCreateUser(user: unknown): { value?: NewUser, error?: string } {

        const validate = joi.object({
            name: joi.string().min(3).required(),
            surname: joi.string().min(3).required(),
            username: joi.string().min(6).required(),
            password: joi.string().min(6).required(),
            jwt: joi.string().min(6),
            email: joi.string().email(),
            newPassword: joi.string().min(6)
        }).validate(user);

        if (validate.error) {
            return { error: validate.error.message };
        }

        return {value: (user as NewUser)};
        
    }

    export function validateUpdateUser(user: unknown): { value?: UpdateUser, error?: string } {

        const validate = joi.object({
            id: joi.string().min(6).required(),
            password: joi.string().min(6).required(),
            jwt: joi.string().min(6).required(),
        }).validate(user);

        if (validate.error) {
            return { error: validate.error.message };
        }

        return {value: (user as UpdateUser)};
        
    }

    export function validateUpdateToken(user: unknown): { value?: UpdateToken, error?: string } {

        const validate = joi.object({
            id: joi.string().min(6).required(),
            jwt: joi.string().min(6).required(),
        }).validate(user);

        if (validate.error) {
            return { error: validate.error.message };
        }

        return {value: (user as UpdateToken)};
        
    }
}