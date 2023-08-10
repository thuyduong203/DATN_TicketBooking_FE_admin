import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // giá trị khởi tạo của state
  listCombo: [],
  detailStaff: {},
};

const ComboSlice = createSlice({
  name: "combo",
  initialState,
  reducers: {
    SetListCombo(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      state.listCombo = action.payload;
      return state;
    },
    AddCombo(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      state.listCombo.unshift(data);
      if (state.listCombo.length >= 5) {
        state.listCombo.pop();
      }

      return state;
    },
    SetDetailCombo(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      state.detailStaff = action.payload;
      return state;
    },
  },
});

export const { SetListCombo, AddCombo, SetDetailCombo } = ComboSlice.actions;

export const GetCombo = (state) => state.combo;
export const GetListCombo = (state) => state.combo.listCombo;
export const GetDetailCombo = (state) => state.combo.listCombo;

export default ComboSlice.reducer;
