import joi from 'joi';

interface UserLogin {
    username: string;
    password: string;
}

interface NewUser {
    name: string;
    surname: string;
    username: string;
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
            jwt: joi.string().min(6)
        }).validate(user);

        if (validate.error) {
            return { error: validate.error.message };
        }

        return {value: (user as NewUser)};
        
    }

    export function validateLogin(user: unknown): { value?: UserLogin, error?: string } {

        const validate = joi.object({
            username: joi.string().min(6).required(),
            password: joi.string().min(6).required()
        }).validate(user);

        if (validate.error) {
            return { error: validate.error.message };
        }

        return { value: (user as UserLogin) };
    }
}