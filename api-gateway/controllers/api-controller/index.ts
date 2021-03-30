import config from '../../config'
import axios from 'axios';

export module APIController {

    // Easy Redirect
    export function redirect(baseURL: string) {
        return axios.create({
            baseURL: baseURL,
        });
    };

    // Request user views by the username
    export async function getViews(username: any) {
        try {
            const views = (await axios.get(config.baseurl + ":" + config.views + "/api/v1/views/users/" + username)).data
            if(views.error){
                return {status: false, error: views.error};
            }  

            if(views.data == []){
                return {status: false, username: username, views: views.data};
            }  

            return {status: true, username: username, views: views.data}
        } catch (error) {
            return {error :"Internal error"}
        }          
    };
}