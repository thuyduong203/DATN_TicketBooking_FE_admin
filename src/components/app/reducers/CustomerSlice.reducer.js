import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiCustomer } from "../../../config/api";

const initialState = {
  listCustomer: [],
  detailCustomer: {},
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    SetListCustomer(state, action) {
      state.listCustomer = action.payload;
      return state;
    },
    SetDetailCustomer(state, action) {
      state.detailCustomer = action.payload;
      return state;
    },
    AddNewCustomer(state, action) {
      state.listCustomer.push(action.payload);
      return state;
    },
    UpdateCustomer(state, action) {
      const updatedCustomerIndex = state.listCustomer.findIndex(
        (item) => item.id === action.payload.id
      );
      if (updatedCustomerIndex !== -1) {
        state.listCustomer[updatedCustomerIndex] = action.payload;
      }
    },
  },
});

export const {
  SetListCustomer,
  SetDetailCustomer,
  AddNewCustomer,
  UpdateCustomer,
} = CustomerSlice.actions;

export const GetCustomer = (state) => state.customer;
export const GetListCustomer = (state) => state.customer.listCustomer;
export const GetDetailCustomer = (state) => state.customer.detailCustomer;

export default CustomerSlice.reducer;
