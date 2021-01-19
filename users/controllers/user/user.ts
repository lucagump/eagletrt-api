import { DB } from '../database/database';
   
export class UserController  {
    public addUser(data: any) {
        try {
            var user = new DB.Models.User(data)
            user.save((err,usr) => {
            if(err) {
                return err;
            } else {
                return  usr;
            }
        });    
        } catch (error) {
            return error
        }
    }

    public getUsers() {
        try {
            let query = DB.Models.User.find({});
            query.exec((err, users) => {
                if(err) {
                    return err;
                } else {
                    return users;
                }
            });
        } catch (error) {
            return error
        }
    }

    public getUser(userID: string): void {
        try {
            DB.Models.User.findById(userID, (err: any, user: any) => {
                if(err) {
                    return err;
                } else {
                    return user;
                }
            });	
        } catch (error) {
            return error
        }
    }
}
