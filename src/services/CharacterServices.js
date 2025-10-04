import axios from 'axios';
import { BACKEND_URL } from '../config/server-config';

// Create axios instance with credentials
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies to be sent with request
});

export const getAll = async () => {
  try {
    const res = await axiosInstance.get(`/character/getAll`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all characters:", error);
    throw error;
  }
};

export const getCharacterById = async (Id) => {
  try {
    const res = await axiosInstance.get(`/character/get/${Id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching character with ID ${Id}:`, error);
    throw error;
  }
}