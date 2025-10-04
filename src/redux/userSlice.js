import { createSlice } from "@reduxjs/toolkit";

// Helper to safely read cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    try {
      return JSON.parse(decodeURIComponent(cookieValue));
    } catch (err) {
      console.error("Failed to parse cookie:", err);
      return null;
    }
  }
  return null;
};

// Initial user state from cookie
const initialUser = getCookie("user");

const userSlice = createSlice({
  name: "user",
  initialState: { user: initialUser || null },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      // Store cookie for 1 year
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(action.payload)
      )}; path=/; expires=${expires.toUTCString()};`;
    },
    removeUser: (state) => {
      state.user = null;
      // Delete cookie
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
