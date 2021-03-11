import { Request, Response } from 'express';
import { viewController } from '../../../controllers';
   
export module RouteController {
    export async function get(req: Request, res: Response) {
        try {
            var data = await viewController.getViews();
            res.json(data);
        } catch (error) {
            res.send(error);
        }
    };
    
    export async function getView(req: Request, res: Response) {
        try {
            var data = await viewController.getView(req.params.view);
            res.json(data);
        } catch (error) {
            res.send(error);
        }
    }

    export async function getUsersViews(req: Request, res: Response) {
        try {
            var data = await viewController.getUsersViews(req.params.userID);
            res.json(data);
        } catch (error) {
            res.send(error);
        }
    }
}