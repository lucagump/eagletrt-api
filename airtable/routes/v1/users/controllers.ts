import { Request, Response } from 'express';
import { userController } from '../../../controllers';
   
export module RouteController {
    export async function get(req: Request, res: Response) {
        try {
            var data = await userController.getUsers();
            res.json(data);
        } catch (error) {
            res.send(error);
        }
    };
    
    export async function getByID(req: Request, res: Response) {
        try {
            var data = await userController.getUser(req.params.userID);
            res.json(data);
        } catch (error) {
            res.send(error);
        }
    }
    export function post(req: Request, res: Response): void {
        try {
            var data = userController.addUser(req.body);
            res.json({message: "User successfully added!", data });
        } catch (error) {
            res.send(error);
        }
    };

    
    export function update(req: Request, res: Response) {
        try {
            var data = userController.updateUser(req.params.id,req.body);
            res.json({message: "User found!", data });
        } catch (error) {
            res.send(error);
        }
    }

    export function deleteUser(req: Request, res: Response) {
        try {
            var data = userController.deleteUser(req.params.userID);
            res.json({message: "User found!", data });
        } catch (error) {
            res.send(error);
        }
    }
}