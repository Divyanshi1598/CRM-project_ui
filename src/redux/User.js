import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  isLoggedIn: false,
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialValue;
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
