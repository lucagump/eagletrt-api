import Airtable from 'airtable';
import config from '../../config'
import Logger from '../../loaders/logger';

export class UserController {
     
    public connectAirtable(){
        if(typeof config.airtableBase === 'string' && typeof config.airtableToken === 'string'){
            var connect = new Airtable({ apiKey : config.airtableToken }).base(config.airtableBase); 
            return connect
        } 
    }

    public async getUsers() {
        var base: any = this.connectAirtable();
        var data: Array<any> = [];
        if(base !== undefined){
            try {
                const records = await base('Users').select().firstPage();
                
                records.forEach((element: { id: any; fields: { Name: any; Surname: any; Username: any; Checked: any; JWT: any; }; }) => {
                    data.push({
                        id: element.id, 
                        name: element.fields.Name,
                        surname: element.fields.Surname,
                        username: element.fields.Username,
                        checked: element.fields.Checked,
                        jwt: element.fields.JWT
                    }) 
                });

                return data
            } catch (err) {
                console.log(err)
                return err.message    
            }
        } else {
            return {}
        }
    }

    public async getUser(id: any) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                const record = await base('Users').find(id)
                
                var data = {
                    id: record.id,
                    name: record.fields.Name,
                    surname: record.fields.Surname,
                    username: record.fields.Username,
                    checked: record.fields.Checked,
                    jwt: record.fields.JWT
                }
    
                return data
            } catch (error) {
                return error
            }
        } else {
            return {error: 'Error connecting to Airtable'}
        }
    }

    public async getUserByUsername(username: any) {
        try {
            const records = await this.getUsers();
            var data = {}
            records.forEach((element: { username: any; }) => {
                if(element.username == username) {
                    data = element;
                    return
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    
    public async updateUser(userID: String, jwt: String) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                var userUpdated = await base('Users').update([{
                    "id": userID,
                    "fields": {
                        "JWT": jwt,
                    }
                }]);
                var data = {
                    id: userUpdated[0].id,
                    name: userUpdated[0].fields.Name,
                    surname: userUpdated[0].fields.Surname,
                    username: userUpdated[0].fields.Username,
                    checked: userUpdated[0].fields.Checked,
                    jwt: userUpdated[0].fields.JWT
                }
                return data
            } catch (error) {
                return {error: 'Wrong userID bro :('}
            }
        } else {
            return {error: 'Error connecting to Airtable'}
        }
    }

    public async deleteUser(userID: any) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                const record = await base('Users').destroy(userID)
                console.log(record)
                return record
            } catch (error) {
                console.log(error)
                return error.message
            }
        } else {
            return {}
        }
    }
}