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

export const getAllAboutStories = async () => {
  try {
    const response = await axiosInstance.get(`/timeline/aboutUs/getAllAbout`);
    const allStories = response.data.data;
    return allStories.filter((story) => story.category === "About Us");
  } catch (error) {
    console.error("Error fetching about us stories:", error);
    throw error;
  }
};
