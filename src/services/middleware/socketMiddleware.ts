import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "../slices/feedSlice";
import {
  wsConnecting as profileWsConnecting,
  wsOpen as profileWsOpen,
  wsClose as profileWsClose,
  wsError as profileWsError,
  wsMessage as profileWsMessage,
} from "../slices/profileOrdersSlice";

type WSActions = {
  wsConnect: string;
  wsDisconnect: string;
  onOpen: typeof wsOpen | typeof profileWsOpen;
  onClose: typeof wsClose | typeof profileWsClose;
  onError: typeof wsError | typeof profileWsError;
  onMessage: typeof wsMessage | typeof profileWsMessage;
  onConnecting: typeof wsConnecting | typeof profileWsConnecting;
};

type WSConnectAction = {
  type: string;
  payload: string;
};

type WSDisconnectAction = {
  type: string;
};

type WSActionTypes = WSConnectAction | WSDisconnectAction | { type: string };

export const socketMiddleware = (wsActions: WSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action: WSActionTypes) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        onConnecting,
      } = wsActions;

      if (action.type === wsConnect && "payload" in action) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(onConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError("Ошибка WebSocket"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          try {
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          } catch (error) {
            console.error("Ошибка:", error);
          }
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(onError(`Ошибка: ${event.code}`));
          }
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsConnect, payload: url } as WSConnectAction);
            }, 3000);
          }
        };
      }

      if (action.type === wsDisconnect) {
        isConnected = false;
        clearTimeout(reconnectTimer);
        if (socket) {
          socket.close(1000, "Закончено");
        }
        socket = null;
      }

      return next(action);
    };
  }) as Middleware;
};
