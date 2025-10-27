import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.status = "loading";
      state.error = null;
    },
    authSuccess(state, action) {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    authFailure(state, action) {
      state.status = "failed";
      state.error = action.payload ?? "Authentication failed";
    },
    clearAuthError(state) {
      state.error = null;
    },
    logout() {
      return { ...initialState };
    },
  },
});

export const { authStart, authSuccess, authFailure, clearAuthError, logout } =
  authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthRole = (state) => state.auth.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
