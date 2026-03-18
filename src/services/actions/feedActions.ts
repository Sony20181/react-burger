import { WS_CONNECT, WS_DISCONNECT } from "../store";
import { WS_ENDPOINTS } from "../../utils/websocket";

export const connectFeed = () => ({
  type: WS_CONNECT,
  payload: WS_ENDPOINTS.all,
});

export const disconnectFeed = () => ({
  type: WS_DISCONNECT,
});
