import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from "./constructorSlice";
import { IngredientType } from "../../utils/types";

const mockBun: IngredientType = {
  _id: "bun-1",
  name: "Булочка тестовая",
  type: "bun",
  price: 100,
  calories: 200,
  proteins: 10,
  fat: 5,
  carbohydrates: 30,
  image: "bun.jpg",
};

const mockIngredient1: IngredientType = {
  _id: "ing-1",
  name: "Соус тестовый",
  type: "sauce",
  price: 50,
  calories: 100,
  proteins: 2,
  fat: 1,
  carbohydrates: 20,
  image: "sauce.jpg",
};

const mockIngredient2: IngredientType = {
  _id: "ing-2",
  name: "Начинка тестовая",
  type: "main",
  price: 150,
  calories: 300,
  proteins: 15,
  fat: 10,
  carbohydrates: 40,
  image: "main.jpg",
};

describe("constructorSlice", () => {
  // Начальное состояние
  test("должен вернуть начальное состояние", () => {
    const initialState = constructorReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({ bun: null, main: [] });
  });

  // addBun - добавление булочки
  test("должен добавить булочку", () => {
    const initialState = { bun: null, main: [] };
    const newState = constructorReducer(initialState, addBun(mockBun));
    expect(newState.bun).toEqual(mockBun);
    expect(newState.main).toEqual([]);
  });

  // addBun - замена существующей булочки
  test("", () => {
    const anotherBun = { ...mockBun, _id: "bun-2", name: "Другая булочка" };
    const stateWithBun = { bun: mockBun, main: [] };
    const newState = constructorReducer(stateWithBun, addBun(anotherBun));
    expect(newState.bun).toEqual(anotherBun);
    expect(newState.bun?._id).toBe("bun-2");
  });

  // addIngredient - добавление ингредиента
  test("должен добавить ингредиент", () => {
    const initialState = { bun: null, main: [] };
    const newState = constructorReducer(
      initialState,
      addIngredient(mockIngredient1),
    );
    expect(newState.main[0]).toMatchObject({
      ...mockIngredient1,
      uuid: expect.any(String),
    });
    expect(newState.main[0].uuid).toBeDefined();
  });

  // addIngredient - добавление нескольких ингредиентов
  test("должен добавить несколько ингредиентов", () => {
    const initialState = { bun: null, main: [] };
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredient1),
    );
    state = constructorReducer(state, addIngredient(mockIngredient2));
    expect(state.main).toHaveLength(2);
    expect(state.main[0]).toMatchObject({
      ...mockIngredient1,
      uuid: expect.any(String),
    });
    expect(state.main[1]).toMatchObject({
      ...mockIngredient2,
      uuid: expect.any(String),
    });
  });
  // removeIngredient - удаление ингредиента
  test("должен удалить ингредиент", () => {
    const stateAfterAdd = constructorReducer(
      { bun: null, main: [] },
      addIngredient(mockIngredient1),
    );
    const uuidToRemove = stateAfterAdd.main[0].uuid;

    const newState = constructorReducer(
      stateAfterAdd,
      removeIngredient(uuidToRemove),
    );
    expect(newState.main).toHaveLength(0);
  });

  // removeIngredient - удаление только одного ингредиента
  test("должен удалить только один ингредиент из двух", () => {
    let state = constructorReducer(
      { bun: null, main: [] },
      addIngredient(mockIngredient1),
    );
    state = constructorReducer(state, addIngredient(mockIngredient2));
    const uuidToRemove = state.main[0].uuid;

    const newState = constructorReducer(state, removeIngredient(uuidToRemove));
    expect(newState.main).toHaveLength(1);
    expect(newState.main[0]).toMatchObject({
      ...mockIngredient2,
      uuid: expect.any(String),
    });
  });
  // moveIngredient - перемещение ингредиента
  test("", () => {
    let state = constructorReducer(
      { bun: null, main: [] },
      addIngredient(mockIngredient1),
    );
    state = constructorReducer(state, addIngredient(mockIngredient2));

    const firstIngredient = state.main[0];
    const secondIngredient = state.main[1];

    const newState = constructorReducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 }),
    );

    expect(newState.main[0]).toEqual(secondIngredient);
    expect(newState.main[1]).toEqual(firstIngredient);
  });

  // moveIngredient - не должен меняться при одинаковых индексах
  test("", () => {
    let state = constructorReducer(
      { bun: null, main: [] },
      addIngredient(mockIngredient1),
    );
    state = constructorReducer(state, addIngredient(mockIngredient2));
    const originalState = { ...state };
    const newState = constructorReducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 0 }),
    );

    expect(newState.main).toEqual(originalState.main);
  });

  // clearConstructor - полная очистка
  test("должен очистить конструктор", () => {
    let state = constructorReducer({ bun: null, main: [] }, addBun(mockBun));
    state = constructorReducer(state, addIngredient(mockIngredient1));
    state = constructorReducer(state, addIngredient(mockIngredient2));

    expect(state.bun).not.toBeNull();
    expect(state.main).toHaveLength(2);

    const newState = constructorReducer(state, clearConstructor());

    expect(newState.bun).toBeNull();
    expect(newState.main).toHaveLength(0);
  });
});
