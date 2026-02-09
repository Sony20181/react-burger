import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";
import orderReducer from "./orderSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});

export default rootReducer;
