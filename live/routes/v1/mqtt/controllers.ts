import { Request, Response } from 'express';
import config from '../../../config'
   
export module RouteController {
    
    export async function getConfiguration(req: Request, res: Response) {
        res.json({
            "configuration": {
                "port": config.mqttPort,
                "hostname": config.mqttHostname
            }
        });
    };
}