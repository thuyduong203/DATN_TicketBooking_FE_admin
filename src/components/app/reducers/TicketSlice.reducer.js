import { createSlice } from "@reduxjs/toolkit";

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
      // let data = action.payload;
      state.detailTicket = action.payload;
      return state;
    },
    // AddNhanVien(state, action) {
    //   // truyền vào 1 tham số
    //   // data truyền vào hợp lệ
    //   let data = action.payload;
    //   let obj = {
    //     id: data.id,
    //     ten: data.ten,
    //     diaChi: data.diaChi,
    //     gioiTinh: data.gioiTinh,
    //     ma: data.ma,
    //     sdt: data.sdt,
    //     idCuaHang: data.cuaHang.id,
    //     tenCuaHang: data.cuaHang.ten,
    //   };
    //   state.listNhanVien.unshift(obj);
    //   state.listNhanVien.pop();
    //   return state;
    // },
    // SetListCuaHang(state, action) {
    //   // truyền vào 1 tham số
    //   // data truyền vào hợp lệ
    //   let data = action.payload;
    //   state.listCuaHang = action.payload;
    // },
  }, // những cái sự kiện thêm, sửa, xóa, tìm kiếm, sắp xếp, ... của thằng initialState
});

export const { SetListTikcet, SetDetailTicket } = TicketSlice.actions;

export const GetTicket = (state) => state.ticket;
export const GetListTicket = (state) => state.ticket.listTicket;
export const GetDetailTicket = (state) => state.ticket.detailTicket;

export default TicketSlice.reducer;
