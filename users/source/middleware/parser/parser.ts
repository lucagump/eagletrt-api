import { NextFunction, Request, Response } from 'express';
import * as typesHelper from './type.helper';

function ResponseMDLW( res: Response){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
}
function RequestMDLW( req: Request){
    if (req.body)
        typesHelper.trimValues(req.body);
    if (req.params)
        typesHelper.trimValues(req.params);
    if (req.query)
        typesHelper.trimValues(req.query);
}


export function mdlware (req: Request, res: Response, next: NextFunction){
    ResponseMDLW(res);
    RequestMDLW(req);
    next()
}