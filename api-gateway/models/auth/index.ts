import joi from 'joi';

interface UserLogin {
    username: string;
    password: string;
}

interface UserUpdate extends UserLogin{
    displayName?: string;
    email?: string;
    newPassword?: string;
}

export class AuthModels {

    public validateUpdate(user: unknown): { value?: UserUpdate, error?: string } {

        const validate = joi.object({
            username: joi.string().min(6).required(),
            password: joi.string().min(6).required(),
            email: joi.string().email(),
            newPassword: joi.string().min(6)
        }).validate(user);

        if (validate.error) {
            return { error: validate.error.message };
        }

        return {value: (user as UserUpdate)};
        
    }

    public validateLogin(user: unknown): { value?: UserLogin, error?: string } {

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