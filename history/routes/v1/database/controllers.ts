import { Request, Response } from 'express';
import { historyController } from '../../../controllers';
   
export module RouteController {
    
    export async function getCollections(req: Request, res: Response) {
        try {
            var data = await historyController.getCollections();
            console.log(data)
            res.json({'collections': data});
        } catch (error) {
            res.send(error);
        }
    };
    export async function getByTimestamp(req: Request, res: Response) {
        try {
            await historyController.getByTimestamp();
            // var data = await historyController.getByTimestamp();
            res.json({'timestamp': 1});
        } catch (error) {
            res.send(error);
        }
    };
    
    export async function getByID(req: Request, res: Response) {
        try {
            // var data = await historyController.getByID(req.params.userID);
            res.json({'id': 2});
        } catch (error) {
            res.send(error);
        }
    }

    export async function getManyFromTimestamp(req: Request, res: Response) {
        try {
            // var data = await historyController.getManyFromTimestamp();
            res.json({'start': req.params.start, 'end': req.params.finish});
        } catch (error) {
            res.send(error);
        }
    };
    
    export async function getManyByTimestamp(req: Request, res: Response) {
        try {
            // var data = await historyController.getManyByTimestamp(req.params.userID);
            res.json({'timestamp': req.body.timestamp[0], 'timestamp1': req.body.timestamp[1]});
        } catch (error) {
            res.send(error);
        }
    }
}