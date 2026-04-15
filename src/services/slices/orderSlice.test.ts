import orderReducer, { createOrder, clearOrder } from "./orderSlice";
import { request } from "../../utils/api";

jest.mock("../../utils/api", () => ({
  request: jest.fn(),
}));

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

const mockRequest = request as jest.MockedFunction<typeof request>;

describe("orderSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  // Начальное состояние
  test("должен вернуть начальное состояние", () => {
    const initialState = orderReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({
      currentOrder: null,
      loading: false,
      error: null,
    });
  });

  // clearOrder
  test("должен очистить заказ и ошибку", () => {
    const stateWithOrder = {
      currentOrder: { number: 12345 },
      loading: false,
      error: "Some error",
    };
    const newState = orderReducer(stateWithOrder, clearOrder());

    expect(newState.currentOrder).toBeNull();
    expect(newState.error).toBeNull();
  });

  // createOrder.pending
  test("должен установить loading: true при pending", () => {
    const initialState = {
      currentOrder: null,
      loading: false,
      error: null,
    };

    const action = { type: createOrder.pending.type };
    const newState = orderReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  // createOrder.fulfilled - успешное создание заказа
  test("должен сохранить номер заказа при fulfilled", () => {
    const initialState = {
      currentOrder: null,
      loading: true,
      error: null,
    };

    const mockOrderNumber = 12345;
    const action = {
      type: createOrder.fulfilled.type,
      payload: { number: mockOrderNumber },
    };

    const newState = orderReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.currentOrder).toEqual({ number: mockOrderNumber });
    expect(newState.error).toBeNull();
  });
  // createOrder.rejected
  test("должен сохранить ошибку при rejected", () => {
    const initialState = {
      currentOrder: { number: 12345 },
      loading: true,
      error: null,
    };

    const errorMessage = "Ошибка создания заказа";
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage },
    };

    const newState = orderReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.currentOrder).toBeNull();
    expect(newState.error).toBe(errorMessage);
  });
});
