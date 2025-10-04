import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

export const getAllAboutStories = async () => {
  const response = await axios.get(`${BACKEND_URL}/timeline/aboutUs/getAllAbout`);
  const allStories = response.data.data;
  return allStories.filter((story) => story.category === "About Us");
};
