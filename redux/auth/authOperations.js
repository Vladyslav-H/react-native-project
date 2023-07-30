import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, logoutAPI, registerAPI } from "../../services/firebaseAPI";
import { auth } from "../../Firebase/config";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ login, email, password, photoURL }, { rejectWithValue }) => {
    try {
      const userData = await registerAPI({ login, email, password, photoURL });
      return userData;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, rejectWithValue) => {
    try {
      const userData = await loginAPI({ email, password });
      return userData;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
    } catch (err) {
      rejectWithValue(err);
    }
  }
);


