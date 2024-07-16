import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    id: "",
    title: "",
    content: "",
    tag: [],
    description: "",
    start_date: "",
    end_date: "",
    status: "",
    content_type: "",
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postAdded: (state, action) => {},
    postEdited: (state, action) => {},
    postDeleted: (state, action) => { },
  
  },
});

export const { postAdded, postEdited, postDeleted } = postSlice.actions;
export default postSlice.reducer;
