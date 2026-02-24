import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";
import orderReducer from "./orderSlice";
import passwordResetReducer from "./passwordResetSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  passwordReset: passwordResetReducer,
  auth: authReducer,
});

export default rootReducer;
