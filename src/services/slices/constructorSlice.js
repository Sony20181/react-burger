import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  main: [],
};

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    // Добавляем булочку
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    // Добавляем ингредиент
    addIngredient: {
      reducer: (state, action) => {
        state.main.push(action.payload);
      },
      prepare: (ingedient) => {
        const uuid = nanoid();
        return {
          payload: { ...ingedient, uuid },
        };
      },
    },
    // Удаляем ингредиент
    removeIngredient: (state, action) => {
      state.main = state.main.filter((item) => item.uuid !== action.payload);
    },
    // Перемещаем ингредиенты
    moveIngredient: (state, action) => {
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
