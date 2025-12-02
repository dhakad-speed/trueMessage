import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface stateTypes {
  username: string;
  message: string;
  createdAt: string;
}
const initialState: stateTypes = {
  username: "",
  message: "",
  createdAt: "",
};
const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<stateTypes>) => {
      if (action.payload.username !== undefined)
        state.username = action.payload.username;
      if (action.payload.message !== undefined)
        state.message = action.payload.message;
      if (action.payload.createdAt !== undefined)
        state.createdAt = action.payload.createdAt;
    },
  },
});
const messageReducer = MessageSlice.reducer;
export const { setMessage } = MessageSlice.actions;
export default messageReducer;
