import defaultUrl from '../baseURL.json';
import axios  from 'axios';
export const baseURL = defaultUrl.baseUrl;
export async function fetchUser() {
    
    try{
        const response = await axios({
            method : "GET",
            url : `${baseURL}/users`
        }).then(data => {console.log(data)}).catch(err => {console.log(err)})
    }catch(err){
        console.log(err)
    }
}
export async function loginService(user : LoginModel) {
    try{
        const response = await axios({
            method : "POST",
            url : `${baseURL}/login`,
            data : {
                "username" : user.username,
                "password" : user.password
            }
        })
        return response.data
    }catch(err){
        return err
    }
}
export async function registerService(user : User) {
    try{
        const response = await axios({
            method : "POST",
            url : `${baseURL}/register`,
            data : {
                "username" : user.username,
                "password" : user.password,
                "email" : user.email
            }
        })
        return response.data
    }catch(err){
        return err
    }
}