import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import productsReducer from "./productsSlice.js";

// Centralised Redux store; feature reducers are registered on this object.
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
