import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_ENDPOINT, request } from "../../utils/api";

type CreateOrderState = {
  currentOrder: { number: number } | null;
  loading: boolean;
  error: string | null;
};

type OrderResponse = {
  order: {
    number: number;
  };
};

const initialState: CreateOrderState = {
  currentOrder: null,
  loading: false,
  error: null,
};
export const createOrder = createAsyncThunk<
  { number: number },
  string[],
  { rejectValue: string }
>("order/createOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("Не найден токен авторизации");
    }

    const data = await request<OrderResponse>(ORDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    });

    return data.order;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || "Ошибка создания заказа",
    );
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.currentOrder = null;
        state.loading = false;
        state.error =
          (action.payload as string) ?? action.error.message ?? null;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
