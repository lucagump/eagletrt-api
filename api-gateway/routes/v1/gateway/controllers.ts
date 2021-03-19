import { Request, Response } from 'express';
import { jwtController } from '../../../controllers';
   
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
}