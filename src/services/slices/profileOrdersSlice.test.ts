import profileOrdersReducer, {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./profileOrdersSlice";
import { Order, WebsocketStatus } from "../../utils/types";

const mockOrders: Order[] = [
  {
    _id: "order1",
    ingredients: ["ing1", "ing2"],
    status: "done",
    name: "заказ 1",
    number: 12345,
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
  },
];

describe("profileOrdersSlice", () => {
  test("должен вернуть начальное состояние", () => {
    const initialState = profileOrdersReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({
      orders: [],
      status: "OFFLINE",
      connectionError: null,
    });
  });

  test("wsConnecting должен установить статус CONNECTING", () => {
    const initialState = {
      orders: [],
      status: "OFFLINE" as WebsocketStatus,
      connectionError: null,
    };
    const newState = profileOrdersReducer(initialState, wsConnecting());
    expect(newState.status).toBe("CONNECTING");
  });

  test("wsOpen должен установить статус online и сбросить ошибку", () => {
    const initialState = {
      orders: [],
      status: "CONNECTING" as WebsocketStatus,
      connectionError: "Error",
    };
    const newState = profileOrdersReducer(initialState, wsOpen());
    expect(newState.status).toBe("ONLINE");
    expect(newState.connectionError).toBeNull();
  });

  test("wsClose должен установить статус offline", () => {
    const initialState = {
      orders: [],
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };
    const newState = profileOrdersReducer(initialState, wsClose());
    expect(newState.status).toBe("OFFLINE");
  });

  test("wsError должен сохранить ошибку", () => {
    const initialState = {
      orders: [],
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };
    const newState = profileOrdersReducer(initialState, wsError("Ошибка"));
    expect(newState.connectionError).toBe("Ошибка");
  });

  test("wsMessage должен обновить заказы при success true", () => {
    const initialState = {
      orders: [],
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };
    const newState = profileOrdersReducer(
      initialState,
      wsMessage({ success: true, orders: mockOrders }),
    );
    expect(newState.orders).toEqual(mockOrders);
  });

  test("wsMessage не должен обновлять заказы при success false", () => {
    const initialState = {
      orders: mockOrders,
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };
    const newState = profileOrdersReducer(
      initialState,
      wsMessage({ success: false, orders: [] }),
    );
    expect(newState.orders).toEqual(mockOrders);
  });
});
