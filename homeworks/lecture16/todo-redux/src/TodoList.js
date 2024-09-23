// src/components/TodoList.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "./todoSlice";

const TodoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      dispatch(addTodo(todoInput));
      setTodoInput("");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
