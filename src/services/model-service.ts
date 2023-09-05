import { useDispatch } from 'react-redux';
import defaultUrl from '../baseURL.json';
import axios  from 'axios';
export const baseURL = defaultUrl.baseUrl;
export async function trainModel(data:object) {
    try{
        const response = await axios({
            method : "POST",
            url: `${baseURL}/trainModel`,
            data : data,
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }catch(err){
        throw err;
    }
}
export async function getMyModels() {
    try{
        const response = await axios({
            method : "GET",
            url: `${baseURL}/getmymodels`,
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }catch(err){
        throw err;
    }
}