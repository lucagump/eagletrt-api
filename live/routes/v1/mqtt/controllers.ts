import { Request, Response } from 'express';
import { mqttController } from '../../../controllers'
   
export module RouteController {
    
    export async function getConfiguration(req: Request, res: Response) {
        try {
            var data = await mqttController.getConfiguration();
            res.json({'configuration': data});
        } catch (error) {
            res.json({"error": error});
        }
    };
}