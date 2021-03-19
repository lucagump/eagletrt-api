import { Request, Response } from 'express';
import { authController, jwtController } from '../../../controllers';
import { AuthModel } from '../../../models';
   
export module RouteController {
        
    export async function login(req: Request, res: Response) {
        try {
            const user = AuthModel.validateLogin(req.body);
            if (user.value) {
                var userData = await authController.login(user);
                if (userData.status == true && userData.password == true) {
                    jwtController.addToken(res, { username: user.value.username, password: user.value.password }, userData.id);
                    
                    return res.status(200).send({
                        username: user.value.username,
                        token: res.getHeader('Authentication')
                    });
                } else {
                    if(userData.password == false){
                        return res.status(301).send({error: "Wrong Password"});
                    } else {
                        return res.status(301).send({error: "Wrong Username"});
                    }
                }
            } else {
                return res.status(400).send(user.error);
            }
        } catch (error) {
            return res.status(500).json({"error": error});
        }
    };

    export async function signup(req: Request, res: Response) {
        try {
            const user = AuthModel.validateCreateUser(req.body);
            if (user.value) {
                user.value.jwt = await jwtController.createToken({username: user.value.username, password: user.value.password });
                
                var userData = await authController.signup(user); 
                if (userData.status == true) {
                    res.header('Authentication', user.value.jwt);
                    return res.status(200).send({
                        username: user.value.username,
                        token: user.value.jwt
                    });
                } else {
                    return res.status(301).send({error: userData.error});
                }       
            } else {
                return res.status(400).send(user.error);
            }         
        } catch (error) {
            return res.status(500).json({"error": error});
            
        }
    }
}