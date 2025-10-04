import axios from "axios";
import { BACKEND_URL } from "../config/server-config";

// ✅ All axios requests that require auth must include cookies
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // crucial for sending/receiving cookies
});

// -------------------- AUTH --------------------

// Login user (sets cookie in browser)
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/api/login`, {
      email: email.toLowerCase(),
      password,
    });
    return response.data; // user info (token handled in cookie)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Logout user (clears cookie)
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`/api/logout`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// Signup user
export const signUpUser = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `/api/signup`,
      {
        email: formData.email.toLowerCase(),
        password: formData.password,
        name: formData.name,
        dob: formData.dob,
        username: formData.username.trim().replace(/\s/g, ""),
        newsLetter: formData.newsLetter,
      },
      { withCredentials: true } // optional, signup usually does not need auth
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};



// -------------------- PASSWORD --------------------

// Forgot password
export const forgetPassword = async (email) => {
  try {
    const res = await axiosInstance.post(`/api/forget-password`, { email });
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Forgot password request failed");
  }
};

// Reset password via link
export const resetPasswordFunc = async (id, token, newPassword) => {
  try {
    const res = await axiosInstance.post(
      `/api/forget-password/${id}/${token}`,
      { newPassword }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Reset password failed");
  }
};

// -------------------- BLOGS --------------------

// Get latest blog
export const getLatestBlog = async () => {
  try {
    const response = await axiosInstance.get(`/blog/latestblog`, { 
      params: { limit: 1 }
    });
    return response?.data?.blogs[0];
  } catch (error) {
    console.error("Error fetching latest blog:", error);
    throw error;
  }
};

// Foundation blogs
export const getFoundationBlogs = async () => {
  try {
    const res = await axiosInstance.get(`/blog/foundation-blogs`);
    return res.data;
  } catch (error) {
    console.error("Error fetching foundation blogs:", error);
    throw error;
  }
};

// IC blogs
export const getICBlogs = async () => {
  try {
    const res = await axiosInstance.get(`/blog/ic-blogs`);
    return res.data;
  } catch (error) {
    console.error("Error fetching IC blogs:", error);
    throw error;
  }
};

// Blog by ID
export const getBlogById = async (id) => {
  try {
    const res = await axiosInstance.get(`/blog/getById/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

// All blogs
export const getAllBlogs = async () => {
  try {
    const res = await axiosInstance.get(`/blog/getallblog`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};
