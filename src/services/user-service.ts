import { useDispatch } from 'react-redux';
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
        throw err
    }
}
export async function registerService(user : UserDTO) {
    try{
        const response = await axios({
            method : "POST",
            url : `${baseURL}/register`,
            data : {
                "name" : user.name,
                "surname" : user.surname,
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

export async function getUserInfo() {
    try{
        const response = await axios({
            method : "GET",
            url : `${baseURL}/getuserinfo`,
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    }catch(err){
        throw err
    }
}

export async function updateUserInfo(userInfo : User) {
    try{
        const response = await axios({
            method : "PUT",
            url : `${baseURL}/changeuserinfo`,
            data : userInfo,
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    }
    catch(err){
        throw err
    }
}
export async function changePassword(passwordModel : PasswordModel) {
    try{
        const response = await axios({
            method : "PUT",
            url : `${baseURL}/changepassword`,
            data : {
                "password" : passwordModel.oldPassword,
                "newPassword" : passwordModel.newPassword
            },
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    }
    catch(err){
        throw err
    }
}