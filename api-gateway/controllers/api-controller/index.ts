import config from '../../config'
import axios from 'axios';

export module APIController {

    // Easy Redirect
    export function redirect(baseURL: string) {
        return axios.create({
            baseURL: baseURL,
        });
    };
}