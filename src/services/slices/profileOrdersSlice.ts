import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, WebsocketStatus } from "../../utils/types";

type ProfileOrdersState = {
  orders: Order[];
  status: WebsocketStatus;
  connectionError: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  status: "OFFLINE",
  connectionError: null,
};

export const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = "CONNECTING";
    },
    wsOpen: (state) => {
      state.status = "ONLINE";
      state.connectionError = null;
    },
    wsClose: (state) => {
      state.status = "OFFLINE";
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (
      state,
      action: PayloadAction<{ orders: Order[]; success: boolean }>,
    ) => {
      if (action.payload.success) {
        state.orders = action.payload.orders;
      }
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
