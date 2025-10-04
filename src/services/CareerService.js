import axios from "axios";
import { BACKEND_URL } from '../config/server-config';

// Create axios instance with credentials
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies to be sent with request
});

export const fetchJob = async () => {
  try {
    const res = await axiosInstance.get(`/career/getall`);
    return res;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
   