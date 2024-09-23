import React from "react";
import "./PhoneLayout.css";

const PhoneLayout = () => {
  const handleButtonClick = (num) => {
    alert(`Button ${num} clicked!`);
  };

  return (
    <div className="phone-screen">
      <div className="status-bar">Status Bar</div>
      <div className="button-grid">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            className="button"
            key={index + 1}
            onClick={() => handleButtonClick(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneLayout;
