// src/FractionConverter.js
import React, { useState } from "react";

const FractionConverter = () => {
  const [value, setValue] = useState("");
  const [fraction, setFraction] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue) {
      const numberValue = Number(inputValue);
      if (!isNaN(numberValue)) {
        setFraction(`${numberValue}${getOrdinalIndicator(numberValue)}`);
      } else {
        setFraction("");
      }
    } else {
      setFraction("");
    }
  };

  const getOrdinalIndicator = (num) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return "st";
    if (lastDigit === 2 && lastTwoDigits !== 12) return "nd";
    if (lastDigit === 3 && lastTwoDigits !== 13) return "rd";
    return "th";
  };

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        style={{
          marginRight: "10px",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {fraction}
      </div>
    </div>
  );
};

export default FractionConverter;
