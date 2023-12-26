import { createSlice } from "@reduxjs/toolkit";

// Check if localStorage is available (only in the browser)
const isLocalStorageAvailable = typeof localStorage !== "undefined";

// Load cart items from local storage or provide an empty array as the default value
const initialCartState = isLocalStorageAvailable
  ? JSON.parse(localStorage.getItem("eduCareClasses") || "[]")
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState, // Initialize with the items from local storage or an empty array
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      if (isLocalStorageAvailable) {
        localStorage.setItem("eduCareClasses", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item._id !== action.payload);
      if (isLocalStorageAvailable) {
        localStorage.setItem("eduCareClasses", JSON.stringify(updatedCart));
      }
      return updatedCart;
    },
    removeAll: () => {
      if (isLocalStorageAvailable) {
        localStorage.removeItem("eduCareClasses");
      }
      return [];
    },
  },
});

export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
