import ingredientDetailsReducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "./ingredientDetailsSlice";

const mockIngredient = {
  _id: "test-id",
  name: "Тестовая булочка",
  type: "main" as const,
  price: 100,
  calories: 200,
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  image: "test.jpg",
};

describe("ingredientDetailsSlice", () => {
  // Начальное состояние
  test("Должен вернуть начальное состояние", () => {
    const initialState = ingredientDetailsReducer(undefined, {
      type: "unknown",
    });
    expect(initialState).toEqual({
      currentIngredient: null,
    });
  });
  test("должен установить текущий ингредиент", () => {
    const initialState = {
      currentIngredient: null,
    };
    const newState = ingredientDetailsReducer(
      initialState,
      setCurrentIngredient(mockIngredient),
    );
    expect(newState.currentIngredient).toEqual(mockIngredient);
    expect(newState.currentIngredient?._id).toBe("test-id");
    expect(newState.currentIngredient?.name).toBe("Тестовая булочка");
  });

  test("должен очистить текущий ингредиент", () => {
    const stateWiithIngredient = {
      currentIngredient: mockIngredient,
    };
    const newState = ingredientDetailsReducer(
      stateWiithIngredient,
      clearCurrentIngredient(),
    );
    expect(newState.currentIngredient).toBeNull();
  });
});
