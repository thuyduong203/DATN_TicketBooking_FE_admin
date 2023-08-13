import { configureStore } from "@reduxjs/toolkit";
import TicketSliceReducer from "./reducers/TicketSlice.reducer";
import RoomSliceReducer from "./reducers/RoomSlice.reducer";

export const store = configureStore({
  reducer: {
    room: RoomSliceReducer,
    ticket: TicketSliceReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
