import { Request, Response } from 'express';
import request from 'request';
import config from '../../../config'

   
export module RouteController {
        
    export async function redirectDocumentation(req: Request, res: Response) {
        try {
            if(req.params.microservice != null){
                var docsPort = config.port
                switch (req.params.microservice) {
                    case 'history':
                        docsPort = "3003";
                        break;
                    case 'users':
                        docsPort = config.users;
                        break;
                    case 'history':
                        docsPort = config.views;
                        break;
                    default:
                        break;
                }
                const options = {
                    url: `http://localhost:${docsPort}/api-docs`,
                };
                request(options).pipe(res);

                // res.status(301).redirect(options.url);

            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };
    
}