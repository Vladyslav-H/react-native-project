import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, getPosts } from "./postOperations";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        console.log("state", state);
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => ({
        ...state,
        items: payload,
      }))
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.items.map((el) =>
          el.postId === payload.postId ? el.comments.push(payload) : el
        );
      });
  },
});

export default postSlice.reducer;
