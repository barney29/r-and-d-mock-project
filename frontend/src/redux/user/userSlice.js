import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    level: "",
    token: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    userUpdated: (state, action) => {},
    setToken: (state, action) => {},
  },
});

export const { userUpdated, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
