import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./slices/feedSlice";
import {
  wsConnecting as profileWsConnecting,
  wsOpen as profileWsOpen,
  wsClose as profileWsClose,
  wsError as profileWsError,
  wsMessage as profileWsMessage,
} from "./slices/profileOrdersSlice";

export const WS_CONNECT = "feed/wsConnect";
export const WS_DISCONNECT = "feed/wsDisconnect";

export const WS_CONNECT_PROFILE = "profileOrders/wsConnect";
export const WS_DISCONNECT_PROFILE = "profileOrders/wsDisconnect";

const feedMiddleware = socketMiddleware({
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
  onConnecting: wsConnecting,
});

const profileMiddleware = socketMiddleware({
  wsConnect: WS_CONNECT_PROFILE,
  wsDisconnect: WS_DISCONNECT_PROFILE,
  onOpen: profileWsOpen,
  onClose: profileWsClose,
  onError: profileWsError,
  onMessage: profileWsMessage,
  onConnecting: profileWsConnecting,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware, profileMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
