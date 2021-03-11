import Airtable from 'airtable';
import config from '../../config'
import Logger from '../../loaders/logger';

export class ViewController {
     
    public connectAirtable(){
        if(typeof config.airtableBase === 'string' && typeof config.airtableToken === 'string'){
            var connect = new Airtable({ apiKey : config.airtableToken }).base(config.airtableBase); 
            return connect
        } 
    }

    public async getViews() {
        var base: any = this.connectAirtable();
        var data: Array<any> = [];
        if(base !== undefined){
            try {
                const records = await base('Views').select().firstPage();
                
                records.forEach((element: { id: any; fields: { Charts: any; }; }) => {
                    data.push(element.fields.Charts) 
                });

                return {data}
            } catch (err) {
                console.log(err)
                return err.message    
            }
        } else {
            return {}
        }
    }

    public async getUsersViews(username: any) {
        var base = this.connectAirtable();
        var data: Array<any> = [];
        var response = {}
        if(base !== undefined){
            try {
                
                const records = await base('Views').select().firstPage();
                
                records.forEach((element: { id: any; fields: { Charts: any; Username: any; }; }) => {
                    if(element.fields.Username.includes(username)){
                        data.push(element.fields.Charts) 
                    }
                });
                
                response = {
                    username: username,
                    data
                }
                
                return response
            } catch (err) {
                console.log(err)
                return err.message
            }
        } else {
            return {}
        }
    }
    
}