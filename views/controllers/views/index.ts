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
                    data.push({
                        charts: element.fields.Charts,
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

    public async getView(id: any) {
        var base: any = this.connectAirtable();
        var data: Array<any> = [];
        if(base !== undefined){
            try {
                const records = await base('Views').select().firstPage();
                return {data: 'booo'}                
            } catch (err) {
                console.log(err)
                return err.message    
            }
        } else {
            return {}
        }
    }

    public async getUsersViews(id: any) {
        var base = this.connectAirtable();
        if(base !== undefined){
            try {
                const record = await base('Users').find(id)
                if (record.id !== null) {
                    const views = await base('Views').find(record.id)
                }
                var data = {
                    id: record.id,
                    name: record.fields.Name,
                    surname: record.fields.Surname,
                    username: record.fields.Username,
                    admin: record.fields.Admin,
                }
    
                return data
            } catch (err) {
                console.log(err)
                return err.message
            }
        } else {
            return {}
        }
    }
    
}