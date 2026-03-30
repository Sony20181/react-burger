import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../../utils/types";

type ConstructorIngredient = IngredientType & {
  uuid: string;
};

type ConstructorState = {
  bun: IngredientType | null;
  main: ConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  main: [],
};

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    // Добавляем булочку
    addBun: (state, action: PayloadAction<IngredientType>) => {
      state.bun = action.payload;
    },
    // Добавляем ингредиент
    addIngredient: {
      reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
        state.main.push(action.payload);
      },
      prepare: (ingedient: IngredientType) => {
        const uuid = nanoid();
        return {
          payload: { ...ingedient, uuid },
        };
      },
    },
    // Удаляем ингредиент
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.main = state.main.filter((item) => item.uuid !== action.payload);
    },
    // Перемещаем ингредиенты
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.main[dragIndex];
      const newMain = [...state.main];
      newMain.splice(dragIndex, 1);
      newMain.splice(hoverIndex, 0, draggedItem);
      state.main = newMain;
    },
    // Очищаем весь конструктор
    clearConstructor: (state) => {
      state.bun = null;
      state.main = [];
    },
  },
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export default constructorSlice.reducer;
