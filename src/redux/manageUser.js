import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    isUser: false,
    manageUserData: '',
    activeMenu:'',
};

export const managUserSlice = createSlice({
  name: "manageuser",
  initialState: initialValue,

  reducers: {
    setUserdata: (state, action) => {
        state.userData = action.payload.data;
    },
  },
});

export const { setUserdata } = managUserSlice.actions;
export default managUserSlice.reducer;
