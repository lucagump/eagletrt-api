import Airtable from 'airtable';
import config from '../../config'
import Logger from '../../loaders/logger';
import bcrypt from 'bcrypt';

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
            } catch (error) {
                return { error: error.message }   
            }
        } else {
            return {error: 'Error connecting to Airtable'}
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
                    password: record.fields.Password,
                    jwt: record.fields.JWT
                }
    
                return data
            } catch (error) {
                return { error: error.message }
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
            return { error: error.message }
        }
    }
    
    public async updateUser(userID: String, jwt: String, password: String) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                var userUpdated = await base('Users').update([{
                    "id": userID,
                    "fields": {
                        "Password": password,
                        "JWT": jwt
                    }
                }]);
                var data = {
                    id: userUpdated[0].id,
                    name: userUpdated[0].fields.Name,
                    surname: userUpdated[0].fields.Surname,
                    username: userUpdated[0].fields.Username,
                    password: userUpdated[0].fields.Password,
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

    public async createUser(user: any) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                var userToInsert = await this.getUserByUsername(user.value.username);
                if(userToInsert.username == user.value.username) {
                    return {error: "User already registered"}
                }

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(user.value.password, salt);
                
                var record = await base('Users').create([{
                    "fields": {
                        "Name": user.value.name,
                        "Surname": user.value.surname,
                        "Username": user.value.username,
                        "Checked": false,
                        "Views": [
                          "recwfBFynTYlcg1EH"
                        ],
                        "JWT": user.value.jwt || "",
                        "Password": hashedPassword
                      }
                }]);

                return record[0].fields
            } catch (error) {
                return {error: error.message }
            }
        } else {
            return {error: 'Error connecting to Airtable'}
        }
    }

    public async deleteUser(username: any) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                var userToDelete = await this.getUserByUsername(username);
                if (userToDelete === {}){
                    return {error: 'Error connecting to Airtable'}
                }
                
                const record = await base('Users').destroy(userToDelete.id)
                console.log(record)
                return record.id
            } catch (error) {
                console.log(error)
                return error.message
            }
        } else {
            return {}
        }
    }
}