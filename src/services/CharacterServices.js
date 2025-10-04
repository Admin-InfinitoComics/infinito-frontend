import axios from 'axios'
import { BACKEND_URL } from '../utils/constants.js'

export const getAll = async () =>{
    const res = await axios.get(`${BACKEND_URL}/character/getAll`)
    return res.data;
}
export const getCharacterById = async(Id)=>{
    const res = await axios.get(`${BACKEND_URL}/character/get/`+Id);
    return res.data;
}