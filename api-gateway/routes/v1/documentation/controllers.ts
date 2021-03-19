import { Request, Response } from 'express';
import request from 'request';
import config from '../../../config'
import { gatewayController, jwtController, apiController } from '../../../controllers';
   
export module RouteController {
        
    export async function redirectDocumentation(req: Request, res: Response) {
        try {
            if(req.params.microservice != null){
                var docsPort = config.port
                switch (req.params.microservice) {
                    case 'history':
                        docsPort = config.history;
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
                    // headers: { roles: user.registrations[0].roles }
                };
                // request(options).pipe(res);
                // apiController.redirect(req.path).then(resp => {
                //     res.send(resp)
                // })

                res.status(301).redirect(options.url);

            } else {
                res.status(400).json({'error': 'invalid req'})
            }
        } catch (error) {
            res.json({"error": error});
        }
    };
    
}