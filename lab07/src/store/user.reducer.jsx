import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    login: JSON.parse(localStorage.getItem("userLogin"))
      ? JSON.parse(localStorage.getItem("userLogin"))
      : null,
  },
  reducers: {
    addLogin: (state, action) => {
      state.login = action.payload;
    },
    actLogout: (state, action) => {
      localStorage.removeItem("userLogin");
      state.login = null;
    },
    addUsers: (state, action) => {
      state.users.push({
        ...action.payload,
        id: Math.floor(Math.random() * 100),
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (users) => users.id !== action.payload.id
      );
    },
    updateUser: (state, action) => {
      let update = "";
      update = state.users.findIndex((users) => users.id === action.payload.id);
      state.users[update] = action.payload;
    },
  },
});
export const { addLogin, actLogout, addUsers, deleteUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
