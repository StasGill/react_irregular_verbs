import React from "react";
import "./input.css";

export const Input = ({ onChange, value, placeholder, tittle }) => {
  return (
    <div>
      {tittle && <p className={"tittle"}>{tittle}</p>}

      <input
        className="input"
        type="text"
        name="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize="off"
        maxLength={30}
      />
    </div>
  );
};
