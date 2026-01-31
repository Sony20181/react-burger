import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_ENDPOINT, request } from "../../utils/api";

const initialState = {
  currentOrder: null,
  loading: false,
  error: null,
};
export const createOrder = createAsyncThunk(
  "ingredients/createOrder",
  async (ingredientIds) => {
    const data = await request(ORDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      mode: "cors",
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    });
    return data.order;
  },
);

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
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
