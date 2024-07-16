import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: [
    {
      id: "",
      title: "",
      content: "",
      tag: [],
      description: "",
      start_date: "",
      end_date: "",
      status: "",
      content_type: "",
      seen: false,
    },
  ],
};

const conentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    markRead: (state, actions) => {},
  },
});

export const { markRead } = conentSlice.actions;
export default conentSlice.reducer;
