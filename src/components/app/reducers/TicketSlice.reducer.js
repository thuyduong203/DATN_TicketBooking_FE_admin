import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiTicket } from "../../../config/api";
import { Modal } from "antd";
import { produce } from "immer";

const initialState = {
  // giá trị khởi tạo của state
  listTicket: [],
  detailTicket: {},
};

const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    SetListTikcet(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      // let data = action.payload;
      state.listTicket = action.payload;
      return state;
    },
    SetDetailTicket(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      state.detailTicket = action.payload;
      return state;
    },
    PrintfTicket(state, action) {
      const ticketId = action.payload;
      const printUrl = `${apiTicket}/print/${ticketId}`;
      axios
        .get(printUrl)
        .then((response) => {
          console.log("In vé thành công:", response.data);
          Modal.success({
            title: "In thành công",
            content: "Vé đã được in thành công.",
          });
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API in vé:", error);
          Modal.error({
            title: "Lỗi khi in vé",
            content: "Đã xảy ra lỗi khi in vé.",
          });
        });
    },
  }, // những cái sự kiện thêm, sửa, xóa, tìm kiếm, sắp xếp, ... của thằng initialState
});

export const { SetListTikcet, SetDetailTicket, PrintfTicket } =
  TicketSlice.actions;

export const GetTicket = (state) => state.ticket;
export const GetListTicket = (state) => state.ticket.listTicket;
export const GetDetailTicket = (state) => state.ticket.detailTicket;

export default TicketSlice.reducer;
