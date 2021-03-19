import config from '../../config'
import bcrypt from 'bcrypt';
import axios from 'axios';

export module AuthController {

    // Login user by checking the password
    export async function login(user: any) {
        try {
            const userToCheck = (await axios.get(config.baseurl + ":3001" + "/api/v1/users/username/" + user.value.username)).data
            if(userToCheck.error){
                return {status: false, error: userToCheck.error};
            }  
            return {status:true, password: checkPassword(user.value.password, userToCheck.password), id: userToCheck.id}
        } catch (error) {
            return {error :"Internal error"}
        }          
    };

    
    // Signup user by checking if the user exist
    export async function signup(user: any) {
        try {
            const userToCheck = (await axios.post(config.baseurl + ":3001" + "/api/v1/users",{
                "name": user.value.name,
                "surname": user.value.surname,
                "username": user.value.username,
                "password": user.value.password,
                "jwt": user.value.jwt
              })).data
            if(userToCheck.error){
                return {status: false, error: userToCheck.error};
            }  
            return {status: true, user: userToCheck}
        } catch (error) {
            return {error :"Internal error"}
        }          
    };

    export function checkPassword(password: string, hashedPassword: string){
        return bcrypt.compareSync(password, hashedPassword);
    }
}