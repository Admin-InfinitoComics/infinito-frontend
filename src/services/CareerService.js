import axios from "axios";
import { BACKEND_URL } from '../utils/constants';

export const fetchJob = async ()=>{
    const res = await axios.get(`${BACKEND_URL}/career/getall`)
    return res;
}
   