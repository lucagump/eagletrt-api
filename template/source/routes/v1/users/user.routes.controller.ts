import { Request, Response } from 'express';
import { userController } from '../../../controllers';
   
export module RouteController {
    export function post(req: Request, res: Response): void {
        try {
            var data = userController.addUser(req.body);
            res.json({message: "User successfully added!", data });
        } catch (error) {
            res.send(error);
        }
    };

    export function get(req: Request, res: Response) {
        try {
            var data = userController.getUsers();
            res.json({message: "User found!", data });
        } catch (error) {
            res.send(error);
        }
    };

    export function getByID(req: Request, res: Response) {
        try {
            var data = userController.getUser(req.params.userID);
            res.json({message: "User found!", data });
        } catch (error) {
            res.send(error);
        }
    }
}