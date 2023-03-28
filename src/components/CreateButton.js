import React from "react";
import "../styles/createButton.css";

function CreateButton() {
  const clickHandler = () => {
    alert("Button not ready")
  };
  return (
    <button className="CreateTodoButton" onClick={clickHandler}>
      +
    </button>
  );
}

export default CreateButton;
