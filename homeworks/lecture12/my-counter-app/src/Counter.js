import React, { useState } from "react";
import "./Counter.css"; // Importing CSS for styles

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = (value) => {
    setCount(count + value);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h1 className="counter-label">Count: {count}</h1>
      <div className="button-container">
        <button onClick={() => increment(1)}>+1</button>
        <button onClick={() => increment(10)}>+10</button>
        <button onClick={() => increment(100)}>+100</button>
        <button onClick={() => increment(1000)}>+1000</button>
        <button onClick={resetCount} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
