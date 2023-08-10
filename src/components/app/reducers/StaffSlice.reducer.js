import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // giá trị khởi tạo của state
  listStaff: [],
  detailStaff: {},
};

const StaffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    SetListStaff(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      state.listStaff = action.payload;
      return state;
    },
    AddNhanVien(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      state.listStaff.unshift(data);
      state.listStaff.pop();
      return state;
    },
    SetDetailStaff(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      state.detailStaff = action.payload;
      return state;
    },
  },
});

export const { SetListStaff, AddNhanVien, SetDetailStaff } = StaffSlice.actions;

export const GetStaff = (state) => state.staff;
export const GetListStaff = (state) => state.staff.listStaff;
export const GetDetailStaff = (state) => state.staff.detailStaff;

export default StaffSlice.reducer;
