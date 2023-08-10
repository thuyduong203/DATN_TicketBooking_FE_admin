import { configureStore } from "@reduxjs/toolkit";
import TicketSliceReducer from "./reducers/TicketSlice.reducer";
import StaffSliceReducer from "./reducers/StaffSlice.reducer";
import ComboSliceReducer from "./reducers/ComboSlice.reducer";
import OrderSliceReducer from "./reducers/OrderSlice.reducer";

export const store = configureStore({
  reducer: {
    ticket: TicketSliceReducer,
    staff: StaffSliceReducer,
    combo: ComboSliceReducer,
    order: OrderSliceReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
