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

export class AuthModels {

    public validateCreateUser(user: unknown): { value?: NewUser, error?: string } {

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
}