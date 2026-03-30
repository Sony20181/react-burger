import feedReducer, {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./feedSlice";
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
  {
    _id: "order2",
    ingredients: ["ing3", "ing4"],
    status: "pending",
    name: "заказ 2",
    number: 12346,
    createdAt: "2024-01-01T13:00:00Z",
    updatedAt: "2024-01-01T13:00:00Z",
  },
];

const mockFeedResponse = {
  success: true,
  orders: mockOrders,
  total: 100,
  totalToday: 5,
};

describe("feedSlice", () => {
  // Начальное состояние
  test("должен вернуть начальное состояние", () => {
    const initialState = feedReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: "OFFLINE",
      connectionError: null,
    });
  });

  // wsConnecting
  test("должен установить статус CONNECTING", () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      status: "OFFLINE" as WebsocketStatus,
      connectionError: null,
    };

    const newState = feedReducer(initialState, wsConnecting());

    expect(newState.status).toBe("CONNECTING");
    expect(newState.connectionError).toBeNull();
  });

  // wsOpen
  test("должен установить статус online и сбросить ошибку", () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      status: "CONNECTING" as WebsocketStatus,
      connectionError: "Previous error",
    };

    const newState = feedReducer(initialState, wsOpen());

    expect(newState.status).toBe("ONLINE");
    expect(newState.connectionError).toBeNull();
  });

  // wsClose
  test("должен установить статус online", () => {
    const initialState = {
      orders: mockOrders,
      total: 100,
      totalToday: 5,
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };

    const newState = feedReducer(initialState, wsClose());

    expect(newState.status).toBe("ONLINE");
  });

  // wsError
  test("должен сохранить ошибку", () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };

    const errorMessage = "WebSocket connection failed";
    const newState = feedReducer(initialState, wsError(errorMessage));

    expect(newState.connectionError).toBe(errorMessage);
  });

  //wsMessage
  test("должен обновить заказы и статистику", () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };

    const newState = feedReducer(initialState, wsMessage(mockFeedResponse));

    expect(newState.orders).toEqual(mockOrders);
    expect(newState.orders).toHaveLength(2);
    expect(newState.total).toBe(100);
    expect(newState.totalToday).toBe(5);
  });

  // wsMessage должен заменить существующие заказы
  test("wsMessage должен заменить заказы новыми", () => {
    const initialState = {
      orders: mockOrders,
      total: 100,
      totalToday: 5,
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };

    const newOrders: Order[] = [
      {
        _id: "order-3",
        ingredients: ["ing-5"],
        status: "created",
        name: "Новый заказ",
        number: 12347,
        createdAt: "2024-01-01T14:00:00Z",
        updatedAt: "2024-01-01T14:00:00Z",
      },
    ];

    const newResponse = {
      success: true,
      orders: newOrders,
      total: 200,
      totalToday: 10,
    };

    const newState = feedReducer(initialState, wsMessage(newResponse));

    expect(newState.orders).toEqual(newOrders);
    expect(newState.orders).toHaveLength(1);
    expect(newState.total).toBe(200);
    expect(newState.totalToday).toBe(10);
  });

  // wsError не должен сбрасывать заказы
  test("wsError должен сохранить существующие заказы", () => {
    const initialState = {
      orders: mockOrders,
      total: 100,
      totalToday: 5,
      status: "ONLINE" as WebsocketStatus,
      connectionError: null,
    };

    const newState = feedReducer(initialState, wsError("Connection lost"));
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.total).toBe(100);
    expect(newState.totalToday).toBe(5);
    expect(newState.connectionError).toBe("Connection lost");
  });
});
