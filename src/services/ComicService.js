import axios from 'axios'
import { BACKEND_URL } from '../config/server-config'

// Create axios instance with credentials
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies to be sent with request
});

export const fetchComics = async () => {
  try {
    const res = await axiosInstance.get(`/comic`);
    // console.log("RES in services: ", res);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
}

export const fetchChapter = async (comicId) => {
  console.log(comicId)
  try {
    const res = await axiosInstance.get(`/comicChap/${comicId}/chapters`);
    console.log(res);
    return res.data.data; 
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
};