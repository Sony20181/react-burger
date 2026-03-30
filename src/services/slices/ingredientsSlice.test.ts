import ingredientsReducer, { fetchIngredients } from "./ingredientsSlice";
import { IngredientType } from "../../utils/types";

const mockIngredients: IngredientType[] = [
  {
    _id: "1",
    name: "Булочка",
    type: "bun",
    price: 110,
    calories: 200,
    proteins: 10,
    fat: 51,
    carbohydrates: 30,
    image: "bun.jpg",
  },
  {
    _id: "2",
    name: "Соус ",
    type: "sauce",
    price: 510,
    calories: 100,
    proteins: 12,
    fat: 11,
    carbohydrates: 20,
    image: "sauce.jpg",
  },
];

describe("ingredientsSlice", () => {
  // Начальное состояние
  test("должен вернуть начальное состояние", () => {
    const initialState = ingredientsReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });

  // fetchIngredients.pending
  test("должен установить loading: true при pending", () => {
    const initialState = {
      items: [],
      loading: false,
      error: null,
    };

    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  // fetchIngredients.fulfilled
  test("должен сохранить ингредиенты", () => {
    const initialState = {
      items: [],
      loading: true,
      error: null,
    };

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.items).toEqual(mockIngredients);
    expect(newState.error).toBeNull();
  });
  // createOrder.rejected
  test("должен сохранить ошибку при rejected", () => {
    const initialState = {
      items: [],
      loading: true,
      error: null,
    };

    const errorMessage = "Ошибка";
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage },
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.items).toEqual([]);
    expect(newState.error).toBe(errorMessage);
  });
});
