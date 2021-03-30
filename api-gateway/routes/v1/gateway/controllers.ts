import { Request, Response } from 'express';
import { jwtController, apiController } from '../../../controllers';
   
export module RouteController {
        
    export async function getViews(req: Request, res: Response) {
        try {
            if(req.params.username != null){
                var data = await apiController.getViews(req.params.username);
                res.json({'views': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };
}