import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listShowTime: [],
};

const ShowTimeSlice = createSlice({
  name: "showTime",
  initialState,
  reducers: {
    SetListShowTime(state, action) {
      state.listShowTime = action.payload;
      return state;
    },
  },
});

export const { SetListShowTime } = ShowTimeSlice.actions;

export const GetShowTime = (state) => state.showTime;
export const GetListShowTime = (state) => state.showTime.listShowTime;

export default ShowTimeSlice.reducer;
