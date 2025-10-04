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
    const response = await axiosInstance.post(`${BACKEND_URL}/api/login`, {
      email: email.toLowerCase(),
      password,
    });
    return response.data; // user info (token handled in cookie)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/api/logout`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// Signup user
export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/signup`,
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
export const forgetPasswordFunc = async (email) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/forget-password`, { email });
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Forgot password request failed");
  }
};

// Reset password via link
export const resetPasswordFunc = async (id, token, newPassword) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/forget-password/${id}/${token}`,
      { newPassword }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Reset password failed");
  }
};

// -------------------- BLOGS --------------------

// Get latest blog
export const latestBlog = async () => {
  const response = await axios.get(`${BACKEND_URL}/blog/latestblog`, {
    params: { limit: 1 },
  });
  return response?.data?.blogs[0];
};

// Foundation blogs
export const getFoundationBlogs = async () => {
  const res = await axios.get(`${BACKEND_URL}/blog/foundation-blogs`);
  return res.data;
};

// IC blogs
export const getICBlogs = async () => {
  const res = await axios.get(`${BACKEND_URL}/blog/ic-blogs`);
  return res.data;
};

// Blog by ID
export const getBlogsById = async (id) => {
  const res = await axios.get(`${BACKEND_URL}/blog/getById/${id}`);
  return res.data;
};

// All blogs
export const getAllBlogs = async () => {
  const res = await axios.get(`${BACKEND_URL}/blog/getallblog`);
  return res.data.data;
};
