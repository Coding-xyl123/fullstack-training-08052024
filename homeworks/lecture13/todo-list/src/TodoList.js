import React, { useState } from "react";
import "../src/styles.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const markAllAsCompleted = () => {
    const newTodos = todos.map((todo) => ({ ...todo, completed: true }));
    setTodos(newTodos);
  };

  const clearCompletedTodos = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-app">
      <h1>Todos-ReactJs</h1>
      <input
        type="text"
        value={inputValue}
        placeholder="Type a todo and hit Enter"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTodo}
      />
      <span>{activeCount} remaining </span>
      <button className="clear-btn" onClick={clearCompletedTodos}>
        Clear completed Todos
      </button>
      <div className="mark-all">
        <input type="checkbox" onChange={markAllAsCompleted} />
        <label>Mark All Done</label>
      </div>
      <div className="todo-list">
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
