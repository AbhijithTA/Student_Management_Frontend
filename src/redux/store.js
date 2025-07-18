import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import studentReducer from "./features/studentSlice";
import staffReducer from "./features/staffSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    staff: staffReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});