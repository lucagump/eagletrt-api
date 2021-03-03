import { Request, Response } from 'express';
import express from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';

const app = express();

const airtableUrl = 'http://localhost:3001/api/v1';

/* 
    this should rediret to the right microservice.
    TO DO: 
        - use the jsonwebtoken to provide auth
        - in route/gateway/index.ts write all the client routes
        - in eventbus/eventExample/index.ts write all the events that should be consumed by other microservices 
*/
app.get('/airtable', function(req, res, next) {
  request(`${airtableUrl}/products`).pipe(res);
});

app.get('/api', function (req,res) {
    res.json({
        text: 'api',
    });
});

app.post('/api/login', function (req: Request, res: Response) {
    const user = { id: 3};
    const token = jwt.sign({user}, 'thats_amore_findus')
    res.json({
        text: 'api',
        token: token
    });
});

app.get('/api/protected', checkToken, function (req: Request, res: Response) {
    jwt.verify(req.token, 'thats_amore_findus', function (err,data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'api is protected',
                data: data
            });
        }
    })
});

function checkToken(req: Request, res: Response, next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, function () {
    console.log('App is listening on port 3000')

})