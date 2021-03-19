import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
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

export module JWTController {

    export function auth(req: Request, res: Response, next: NextFunction): void {
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

    export async function addToken(res: Response, user: { username: string, password: string }, id: string): Response {
      const token = jwt.sign(user, config.secretSHSH as string);
      axios.put(config.baseurl + ":3001" + "/api/v1/users/" + id + "/token",
        {
          "jwt": token
        }
      );
      return res.header('Authentication', token);
    }

    export async function createToken(user: { username: string, password: string}){
      return jwt.sign(user, config.secretSHSH as string);
    }

    export function newAuth(req: Request, res: Response, next: NextFunction): void {
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
