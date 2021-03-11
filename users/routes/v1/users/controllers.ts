import { Request, Response } from 'express';
import { userController } from '../../../controllers';
   
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
                res.json(data);
            } else{
                res.status(400).json({error: "Bad Parameters"})
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    export async function update(req: Request, res: Response) {
        try {
            console.log(req.params)
            if(req.params.userID !== null && req.body.jwt !== null) {
                var data = await userController.updateUser(req.params.userID,req.body.jwt);
                res.status(201).json(data);
            } else{
                res.status(400).json({error: "Bad Parameters"})
            }
        } catch (error) {
            console.log(error)

            res.status(500).json(error);
        }
    }
}