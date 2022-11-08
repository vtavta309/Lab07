import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.reducer";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
  },
});
