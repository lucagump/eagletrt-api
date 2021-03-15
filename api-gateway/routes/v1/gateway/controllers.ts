import { Request, Response } from 'express';
import { gatewayController, jwtController } from '../../../controllers';
import { AuthModel } from '../../../models';
   
export module RouteController {
        
    export async function getCollections(req: Request, res: Response) {
        try {
            if(req != null){
                var data = await gatewayController.getMessage();
                res.json({'sessions': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };
    export async function loginTEST(req: Request, res: Response) {
        const user = AuthModel.validateLogin(req.body);
        if (user.error) {
            return res.status(400).send(user.error);

        } else if (user.value) {

            // chiama airtable (get data)
            var userData = {user: {username:"rest"}, password:"rest"}} 
            //await userServices.login(user.value);

            if (!userData) {
                return res.status(301).send("Wrong Credential Bro :'(");
            }

            jwtController.addToken(res, { username: userData.user.username, password: userData.password });
            
            res.status(200).send({
                ...userData.user,
                token: res.getHeader('Authentication')
            });
        }
    };

    export async function signupTEST(req: Request, res: Response) {
        const user = AuthModel.validateUpdate(req.body);
        if (user.error) {
            return res.status(400).send(user.error);
    
        } else if (user.value) {
            if (await userServices.checkUsernameExists(user.value.username)) {
                res.status(403).send(LANG.AUTH_USERNAME_ALREADY_IN_USE);
    
            } else {
    
                var userData = {user: {username:"rest"}, password:"rest"}} 
                //const userInfo = await userServices.createUser(user.value);
                jwtController.addToken(res, { username: userData.user.username, password: userData.password });

                res.status(201).send({
                    ...userData.user,
                    token: res.getHeader('Authentication')
                });
            }
        }
    }

    export async function login(req: Request, res: Response) {
        try {
            if(req != null){
                var data = await gatewayController.getMessage();
                res.json({'sessions': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };

    export async function signup(req: Request, res: Response) {
        try {
            if(req != null){
                var data = await gatewayController.getMessage();
                res.json({'sessions': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };

}