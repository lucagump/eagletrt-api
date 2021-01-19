import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';

function logger( req: Request){
    // console.log("Request Type: ",req.method);
}


export function mdlware (req: Request, res: Response, next: NextFunction){
    logger(req)
    next()
}