import React from "react";
import "./container.css";

const Container = ({ children, width = 960 }) => {
  return (
    <div className="container" style={{ maxWidth: `${width}px` }}>
      {children}
    </div>
  );
};

export default Container;
