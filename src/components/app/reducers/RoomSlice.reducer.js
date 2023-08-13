import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listRoom: [],
};
const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setListRoom: (state, action) => {
      state.listRoom = action.payload;
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", state.listRoom);
      return state;
    },
    addRoom: (state, action) => {
      state.listRoom.push(action.payload);
    },
    updateRoom: (state, action) => {
      const updatedRoom = action.payload; // Dữ liệu phòng đã cập nhật
      const updatedIndex = state.listRoom.findIndex(
        (room) => room.id === (action.payload ? action.payload.id : null)
      );

      if (updatedIndex !== -1) {
        // Tạo bản sao mới của mảng và cập nhật dữ liệu tại vị trí updatedIndex
        const newListRoom = [...state.listRoom];
        newListRoom[updatedIndex] = updatedRoom;

        // Trả về trạng thái mới
        state.listRoom = newListRoom;
      }
    },
    deleteRoom: (state, action) => {
      const deletedRoomId = action.payload; // Id của phòng đã bị xóa
      const updatedListRoom = state.listRoom.filter(
        (room) => room.id !== deletedRoomId
      );

      state.listRoom = updatedListRoom;
    },
  },
});
export const { setListRoom, addRoom, updateRoom, deleteRoom } =
  RoomSlice.actions;

export const GetRoom = (state) => state.room.listRoom;

export default RoomSlice.reducer;
