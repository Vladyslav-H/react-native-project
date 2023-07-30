import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authOperations";

const initialState = {
  userId: null,
  login: null,
  email: null,
  photoUrl: null,
  token: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => ({
        ...state,
        userId: payload.uid,
        login: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
        token: payload.accessToken,
        isLoading: false,
      }))
      .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        userId: payload.uid,
        login: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
        token: payload.accessToken,
        isLoading: false,
      }))
      .addCase(logoutUser.fulfilled, (state) => ({
        state: initialState,
      }))
      .addMatcher(
        (action) => action.type.endsWith("/panding"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export default authSlice.reducer;
