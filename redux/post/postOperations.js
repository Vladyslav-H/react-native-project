import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPostsFromFirestoreAPI,
  writeCommentInFirestoreAPI,
  writePostToFirestoreAPI,
} from "../../services/firebaseAPI";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const newPost = await writePostToFirestoreAPI(postData);

      return newPost;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/get",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getPostsFromFirestoreAPI();

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "posts/createComment",
  async (data, { rejectWithValue }) => {
    try {
      const newComment = await writeCommentInFirestoreAPI(data);

      return newComment;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
