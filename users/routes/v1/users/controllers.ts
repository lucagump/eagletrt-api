import { Request, Response } from 'express';
import { userController } from '../../../controllers';
import { AuthModel } from '../../../models';
   
export module RouteController {
    export async function get(req: Request, res: Response) {
        try {
            var data = await userController.getUsers();
            res.json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    
    export async function getByID(req: Request, res: Response) {
        try {
            if(req.params.userID !== null) {
                var data = await userController.getUser(req.params.userID);
                if (Object.keys(data).length === 0){
                    return res.status(404).json(data)
                }
                res.status(200).json(data);
            } else{
                res.status(400).json({error: "Bad Parameters"})
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    export async function getUserByUsername(req: Request, res: Response) {
        try {
            if(req.params.username !== null) {
                var data = await userController.getUserByUsername(req.params.username);
                if (Object.keys(data).length === 0){
                    return res.status(404).json(data)
                }
                res.status(200).json(data);
            } else{
                res.status(400).json({error: "Bad Parameters"})
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    export async function update(req: Request, res: Response) {
        try {
            if(req.params.userID !== null && req.body.jwt !== null && req.body.password !== null) {
                var data = await userController.updateUser(req.params.userID,req.body.jwt,req.body.password);
                res.status(201).json(data);
            } else{
                res.status(400).json({error: "Bad Parameters"})
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    export async function post(req: Request, res: Response) {
        const user = AuthModel.validateCreateUser(req.body);
        if (user.error) {
            return res.status(400).send(user.error);
        } else if (user.value) {
            try {
                var data = await userController.createUser(user);
                res.status(201).json(data);
            } catch (error) {
                res.status(500).json(error);
            }
        }
    }

    export async function deleteUser(req: Request, res: Response) {
        try {
            if(req.params.username !== null) {
                var data = await userController.deleteUser(req.params.username);
                if (data.error !== undefined){
                    return res.status(404).json({error: "user not found"})
                }
                res.status(200).json({userid: data});
            } else{
                res.status(400).json({error: "Bad Parameters"})
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}