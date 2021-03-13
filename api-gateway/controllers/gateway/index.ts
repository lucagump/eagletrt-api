import config from '../../config'

export class GatewayController {

    // Get message
    public async getMessage() {

        // const client = await MongoClient.connect(config.databaseUrl as string, config.databaseConfig)
        //     .catch(err => { console.log(err); });

        // if (!client) {
        //     console.log('error')
        //     return {"error":"Database connection error"}
        // }

        // try {
        //     const db = client.db(config.databaseNameTest as string);
        //     var data = await db.listCollections().toArray();
        //     var response: any  = []
        //     data.forEach(element => {
        //         response.push(element.name)
        //     });
        //     return response
        // } catch (error) {
        //     return {"error":"Database query error"}
        // } finally {
        //     await client.close();
        // }            
        return {message: "it's a prank bro"}
    };
}