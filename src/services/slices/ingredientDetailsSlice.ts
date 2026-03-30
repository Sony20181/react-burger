import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../../utils/types";

type IngredientState = {
  currentIngredient: IngredientType | null;
};

const initialState: IngredientState = {
  currentIngredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
