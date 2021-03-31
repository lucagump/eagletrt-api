import { Request, Response } from 'express';
import { viewController } from '../../../controllers';
   
export module RouteController {
    export async function get(req: Request, res: Response) {
        try {
            var data = await viewController.getViews();
            res.json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    
    export async function getUsersViews(req: Request, res: Response) {
        try {
            if(req.params.username !== null) {
                var data = await viewController.getUsersViews(req.params.username);
                if (data.data.length == 0){
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
}