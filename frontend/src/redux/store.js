import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import contentReducer from "./content/contentSlice";
import postReducer from "./post/contentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    content: contentReducer,
  },
});

export default store;
