import config from '../../config'
import bcrypt from 'bcrypt';
import axios from 'axios';

export module AuthController {

    // Login user by checking the password
    export async function login(user: any) {
        try {
            // 3001
            const userToCheck = (await axios.get(config.baseurl + ":"  + config.users + "/api/v1/users/username/" + user.value.username)).data
            if(!Array.isArray(userToCheck) && userToCheck.error){
                return {status: false, error: userToCheck.error};
            }  
            var compare = await bcrypt.compare(user.value.password as string, userToCheck[0].password as string);

            return {status:true, password: compare, id: userToCheck[0].id}
        } catch (error) {
            console.log(error)
            return {error :"Internal error"}
        }          
    };

    
    // Signup user by checking if the user exist
    export async function signup(user: any) {
        try {
            const userToCheck = (await axios.post(config.baseurl + ":"  + config.users + "/api/v1/users",{
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