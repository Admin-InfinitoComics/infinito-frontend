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

export const getAllStories = async () => {
  try {
    const response = await axiosInstance.get(`/timeline/getAll`);
    const allStories = response.data.data;
    return allStories.filter((story) => story.category === "Support Us");
  } catch (error) {
    console.error("Error fetching support stories:", error);
    throw error;
  }
};

export const createSupport = async (supportData) => {
  try {
    // No need to pass token as it's handled by cookies now
    const response = await axiosInstance.post(
      `/support/create`,
      supportData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating support:", error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const res = await axiosInstance.get(`/support/statistics`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching support statistics:", error);
    throw error;
  }
};