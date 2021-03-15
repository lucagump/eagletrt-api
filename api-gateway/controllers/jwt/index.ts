import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './../../config'

function handleUnauthorized(res: Response) {
    if (config.loginRedirectUrl) {
      res.redirect(config.loginRedirectUrl)
    }
    else {
      res.status(401).json({
        status: 401,
        message: 'UNAUTHORIZED'
      })
    }
}

export class JWTController {

    public auth(req: Request, res: Response, next: NextFunction): void {
        if (req.method === 'OPTIONS') {
            next();
            return;
        }
        const token = req.header('Authorization');
        if (token) {
            try {
                res.locals = jwt.verify(token, config.secretSHSH as string) as Record<string, unknown>;
                next();
                return;
            } catch (err) {
                res.status(301).json({error: "invalid token"});
            }
        } else {
            res.status(301).send({error: "no token found"});
        }
    }

    public addToken(res: Response, user: { username: string, password: string}): Response {
        const token = jwt.sign(user, config.secretSHSH as string);
        // chiama airtable (update token)
        return res.header('Authentication', token);
    }

    public newAuth(req: Request, res: Response, next: NextFunction): void {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
              console.log('Authorization header missing. Denying request.')
              handleUnauthorized(res);
              return;
            }
      
            const bearer = authorization.split(' ');
            if (!bearer || bearer.length != 2) {
              console.log('Bearer header value malformed. Denying request.')
              handleUnauthorized(res);
              return;
            }
      
            var token = bearer[1];
            if (!token) {
              console.log('Token not provided. Denying request.')
              handleUnauthorized(res);
              return;
            }
      
            const decoded_token = jwt.verify(token, config.secretSHSH as string);
            // These could be null if the user isn't logged in
            req.roles = decoded_token.roles; 
      
        } catch(err) {
        console.error(err);
        handleUnauthorized(res);
        return;
        }
    
        next();
    }
}
