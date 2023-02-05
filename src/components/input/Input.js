import React from "react";
import "./input.css";

export const Input = ({ onChange, value }) => {
  return (
    <div>
      <input
        className="input"
        type="text"
        name="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to find here"
        autocomplete="off"
        autoCapitalize="off"
      />
    </div>
  );
};
