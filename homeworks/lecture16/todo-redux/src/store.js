import { configureStrore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const store = configureStrore({
  reducer: {
    todos: todoReducer,
  },
});
export default store;
