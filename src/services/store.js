import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["constructor/addIngredient"],
        ignoredPaths: ["burgerConstructor.ingredients"],
      },
    }),

  devTools: process.env.NODE_ENV !== "production",
});
