"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface FetchState {
  refetch: boolean;
}

// 👇 Use the updated interface here too
const initialState: FetchState = {
  refetch: false,
};

const fetchPostSlice = createSlice({
  name: "refetchPosts",
  initialState,
  reducers: {
    toggleRefetch: (state) => {
      state.refetch = !state.refetch;
    },
    setRefetch: (state, action: { payload: boolean }) => {
      state.refetch = action.payload;
    },
  },
});

export const { toggleRefetch, setRefetch } = fetchPostSlice.actions;
export default fetchPostSlice.reducer;
