import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  mappingData: '',
};

export const mapSlice = createSlice({
  name: "mapping",
  initialState: initialValue,

  reducers: {
    setMapping: (state, action) => {
      console.log("setMapping", action.payload);
      state.mappingData = action.payload.data;
    },

  },
});

export const { setMapping } = mapSlice.actions;
export default mapSlice.reducer;
