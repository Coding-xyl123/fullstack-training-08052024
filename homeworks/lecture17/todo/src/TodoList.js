import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, toggleTodo } from "../actions/todoActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state);

  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      dispatch(addTodo(todoInput));
      setTodoInput("");
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="todo"
          placeholder="Enter a new todo..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              data-id={todo._id}
              onChange={() => handleToggle(todo._id)}
            />
            {todo.todo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
