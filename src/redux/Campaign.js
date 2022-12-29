import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  activeMenu: '',
  paremsData: '',
  campdetail: {},
  component: {}
};

export const campSlice = createSlice({
  name: "campaign",
  initialState: initialValue,

  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload.data;
    },
    setParems: (state, action) => {
      state.paremsData = action.payload.data;
    },
    setCampaignDetail: (state, action) => {
      state.campdetail = action.payload.data;
    },
    setComponentDetail: (state, action) => {
      state.component = action.payload.data;
    },
  },
});

export const { setActiveMenu, setParems, setCampaignDetail, setComponentDetail } = campSlice.actions;
export default campSlice.reducer;
