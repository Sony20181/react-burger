import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, INGREDIENTS_ENDPOINT } from "../../utils/api";
import { IngredientType } from "../../utils/types";

type IngredientsState = {
  items: IngredientType[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const data = await request<{ data: IngredientType[] }>(
      INGREDIENTS_ENDPOINT,
    );
    return data.data;
  },
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default ingredientsSlice.reducer;
