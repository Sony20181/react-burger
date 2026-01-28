import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { INGREDIENTS_URL } from "../../utils/api";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetch(INGREDIENTS_URL);

    if (!response.ok) {
      throw new Error("Ошибка при загрузке ингредиентов");
    }
    const data = await response.json();

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
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
