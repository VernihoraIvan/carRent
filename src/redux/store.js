import { configureStore } from "@reduxjs/toolkit";

import { carsReducer } from "./cars/slice";
import { choiceReducer, favoriteReducer, filterReducer } from "./filter/slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filter: filterReducer,
    choice: choiceReducer,
    favorite: favoriteReducer,
  },
});
