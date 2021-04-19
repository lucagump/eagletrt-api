import { Request, Response } from 'express';
import { serialize } from 'node:v8';
import { historyController } from '../../../controllers';
   
export module RouteController {
    
    export async function getCollections(req: Request, res: Response) {
        try {
            var data = await historyController.getCollections();
            res.json({'collections': data});
        } catch (error) {
            res.json({"error": error});
        }
    };
    
    export async function getSessions(req: Request, res: Response) {
        try {
            if(req.params.collection != null){
                var collection = req.params.collection
                var data = await historyController.getSessions(collection);
                res.json({'sessions': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };

    export async function getSessionDocuments(req: Request, res: Response) {
        try {
            if(req.params.collection != null && req.params.session != null){
                var collection = req.params.collection
                var session = req.params.session

                var data = await historyController.getSessionDocuments(collection,session,req.body.pageSize,req.body.pageIndex);
                res.json({'sessions': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };

    export async function getSessionMinMaxTimestamp(req: Request, res: Response) {
        try {
            if(req.params.collection != null && req.params.session != null){
                var collection = req.params.collection
                var session = req.params.session

                var data = await historyController.getSessionMinMaxTimestamp(collection,session);
                res.json({'session': session, data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };

    export async function getByTimestamp(req: Request, res: Response) {
        try {
            if(req.params.collection != null && req.params.timestamp != null){
                
                var collection = req.params.collection
                var timestamp = parseInt(req.params.timestamp)

                var data = await historyController.getByTimestamp(collection,timestamp);
                
                res.json({'document': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };
    
    export async function getByID(req: Request, res: Response) {
        try {
            if(req.params.collection != null && req.params.id != null){
                
                var collection = req.params.collection
                var id = parseInt(req.params.id)

                var data = await historyController.getByID(collection,id);
                
                res.json({'document': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    }
    
    export async function getManyFromTimestamp(req: Request, res: Response) {
        try {
            if(req.params.collection != null && req.params.session != null && req.params.start != null && req.params.finish != null){
                
                var collection = req.params.collection
                var session = req.params.session
                var start = parseInt(req.params.start)
                var finish = parseInt(req.params.finish)
                var data = await historyController.getManyFromTimestamp(collection,session,start,finish);
                
                res.json({'documents': data});
            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };
}