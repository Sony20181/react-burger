import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Order, FeedResponse, WebsocketStatus } from "../../utils/types";

type FeedState = {
  orders: Order[];
  total: number;
  totalToday: number;
  status: WebsocketStatus;
  connectionError: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: "OFFLINE",
  connectionError: null,
};

export const feedSlice = createSlice({
  name: "feed",
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
      state.status = "ONLINE";
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<FeedResponse>) => {
      console.log("ОБНОВЛЕНИЕ ЛЕНТЫ:", new Date().toLocaleTimeString());
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  feedSlice.actions;

export default feedSlice.reducer;
