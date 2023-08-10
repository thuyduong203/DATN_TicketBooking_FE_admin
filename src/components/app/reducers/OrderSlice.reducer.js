import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listOrder: [],
  detailOrder: {},
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SetListOrder(state, action) {
      state.listOrder = action.payload;
      return state;
    },
    AddOrder(state, action) {
      let data = action.payload;
      state.listOrder.unshift(data);
      if (state.listOrder.length >= 10) {
        state.listOrder.pop(data);
      }
    },
    SetDetailOrder(state, action) {
      state.detailOrder = action.payload;
      return state;
    },
  },
});

export const {SetListOrder, AddOrder, SetDetailOrder} = OrderSlice.actions;

export const GetOrder = (state) => state.order;
export const GetListOrder = (state) => state.order.listOrder;
export const GetDetailOrder = (state) => state.order.listOrder;

export default OrderSlice.reducer;
