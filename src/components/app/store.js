import { configureStore } from "@reduxjs/toolkit";
import TicketSliceReducer from "./reducers/TicketSlice.reducer";

export const store = configureStore({
  reducer: {
    ticket: TicketSliceReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
