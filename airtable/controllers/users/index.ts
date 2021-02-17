import Airtable from 'airtable';
import config from '../../config'


export class UserController {
     
    public connectAirtable(){
        if(typeof config.airtableBase === 'string' && typeof config.airtableToken === 'string'){
            var connect = new Airtable({ apiKey : config.airtableToken }).base(config.airtableBase); 
            return connect
        } 
    }

    public async getUsers() {
        var base = this.connectAirtable();
        var data: Array<any> = [];
        try {
            const records = await base('Users').select().firstPage();
            
            records.forEach(element => {
                data.push({
                    id: element.id, 
                    name: element.fields.Name,
                    surname: element.fields.Surname,
                    username: element.fields.Username,
                    admin: element.fields.Admin
                }) 
            });

            return data
        } catch (err) {
            console.log(err)
            return err.message    
        }
    }
    public async getUser(id: any) {
        var base = this.connectAirtable();
        try {
            const record = await base('Users').find(id)
            
            var data = {
                id: record.id,
                name: record.fields.Name,
                surname: record.fields.Surname,
                username: record.fields.Username,
                admin: record.fields.Admin,
            }
            console.log(data)

            return data
        } catch (err) {
            console.log(err)
            return err.message
        }
    }
    
    public async addUser(req: any) {
        return "todo"
    }

    public async updateUser(id: any, body:any) {
        var base = this.connectAirtable();
        try {
            const user = await this.getUser(id);
            const userDeleted = await this.deleteUser(id);

            var userUpdated = await base('Users').create({
                "Name": user.fields.Name,
                "Surname": user.fields.Surname,
                "Username": user.fields.Username,
                "admin": user.fields.Admin, 
            });
            return userUpdated
        } catch (error) {
            console.log(error)
            return error.message
        }
    }

    public async deleteUser(id: any) {
                var base = this.connectAirtable();
        try {
            const record = await base('Users').destroy(id)
            
            var data = {
                id: record.id,
                name: record.fields.Name,
                surname: record.fields.Surname,
                username: record.fields.Username,
                admin: record.fields.Admin,
            }
            console.log(data)

            return data
        } catch (err) {
            console.log(err)
            return err.message
        }
    }
}