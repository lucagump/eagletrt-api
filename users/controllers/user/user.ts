import { Request, Response } from 'express';
import { DB } from '../database/database';
   
export class UserController  {
    public create(req: Request, res: Response): void {
        var newuser = new DB.Models.User(req.body)
        newuser.save((err,user) => {
            if(err) {
                res.send(err);
            } else {
                res.json({message: "User successfully added!", user });
            }
        });
    }

    public read(req: Request, res: Response): void {
        let query = DB.Models.User.find({});
        query.exec((err, users) => {
            if(err) res.send(err);
            //If no errors, send them back to the client
            res.json(users);
        });
    }

    public readOne(req: Request, res: Response): void {
        DB.Models.User.findById(req.params.userID, (err: any, user: any) => {
            if(err) res.send(err);
            //If no errors, send it back to the client
            res.json(user);
        });	
    }

    public update(req: Request, res: Response): void {        
        DB.Models.User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, (err: any, user: any) => {
            if (err) {
                console.log(err)
                res.status(500).send({
                    status: 'fail',
                    statusCode: 500,
                    errorMessage: 'User couldn\'t be update'
                  })
            } 
            if (user != null) {
                res.status(201).send({
                    status: 'success',
                    statusCode: 201,
                    data: user
                  })
            } else {
                res.status(404).send({
                    status: 'fail',
                    statusCode: 404,
                    errorMessage: 'User couldn\'t be found, please try again later'
                })
            }
        });
    }

    // public delete(req: Request, res: Response): void {
    //     DB.Models.User.remove({_id : req.params.userID}, (err: any, result: any) => {
    //         if (err) {
    //             console.log(err)
    //             res.status(500).send({
    //                 status: 'fail',
    //                 statusCode: 500,
    //                 errorMessage: 'User couldn\'t be update'
    //               })
    //         } else {
    //             res.json({ message: "User successfully deleted!", result });
    //         }
    //     });
    // }
}
