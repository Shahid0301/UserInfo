import React, { Children } from "react";

function CustomButton({ children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
          { children }
    </button>
  );
}

export default CustomButton;
