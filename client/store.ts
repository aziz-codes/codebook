"use client";
import { configureStore } from "@reduxjs/toolkit";
import newPostReducer from "./slices/fetch-posts";

export const store = configureStore({
  reducer: {
    refetchPost: newPostReducer,
  },
});

// Export types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
