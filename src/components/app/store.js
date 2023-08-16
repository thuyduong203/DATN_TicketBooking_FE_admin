import { configureStore } from "@reduxjs/toolkit";
import TicketSliceReducer from "./reducers/TicketSlice.reducer";

import RoomSliceReducer from "./reducers/RoomSlice.reducer";

import StaffSliceReducer from "./reducers/StaffSlice.reducer";
import ComboSliceReducer from "./reducers/ComboSlice.reducer";
import OrderSliceReducer from "./reducers/OrderSlice.reducer";
import ShowTimeSliceReducer from "./reducers/ShowTimeSlice.reducer";
import CustomerSliceReducer from "./reducers/CustomerSlice.reducer";

export const store = configureStore({
  reducer: {
    room: RoomSliceReducer,
    ticket: TicketSliceReducer,
    staff: StaffSliceReducer,
    combo: ComboSliceReducer,
    order: OrderSliceReducer,
    showTime: ShowTimeSliceReducer,
    customer: CustomerSliceReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
