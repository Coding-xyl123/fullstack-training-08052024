import { error } from "console";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TODOS_SUCCESS":
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: null,
      };
    case "FETCH_TODOS_FAILURE":
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "TOGGLE_TODO":
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
      );

      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
};
export default todoReducer;
