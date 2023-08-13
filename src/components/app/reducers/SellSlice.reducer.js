import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Modal } from "antd";

const initialState = {
  // giá trị khởi tạo của state
};

const SellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {},
});

export const {} = SellSlice.actions;

export default SellSlice.reducer;
