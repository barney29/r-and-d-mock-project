import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import contentReducer from "./content/contentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
  },
});

export default store;
