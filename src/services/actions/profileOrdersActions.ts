import { WS_ENDPOINTS } from "../../utils/websocket";
import { WS_CONNECT_PROFILE, WS_DISCONNECT_PROFILE } from "../store";

export const connectProfileOrders = () => {
  const accessToken = localStorage
    .getItem("accessToken")
    ?.replace("Bearer ", "");

  return {
    type: WS_CONNECT_PROFILE,
    payload: `${WS_ENDPOINTS.user}?token=${accessToken}`,
  };
};

export const disconnectProfileOrders = () => ({
  type: WS_DISCONNECT_PROFILE,
});
