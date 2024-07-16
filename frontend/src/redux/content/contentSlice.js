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
    contentAdded: (state, action) => {},
    contentEdited: (state, action) => {},
    contentDeleted: (state, action) => {},
  },
});

export const getAllContentSelector = (state) => state.content.contents;
export const getByIdContentSelector = (state, id) =>
  state.content.contents.filter((content) => content.id === id);

export const { markRead } = conentSlice.actions;
export default conentSlice.reducer;
