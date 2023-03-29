import React from "react";
import "../styles/createButton.css";

function CreateButton(props) {
  
  return (
    <button className="CreateTodoButton" onClick={props.addTodo}>
      +
    </button>
  );
}

export default CreateButton;
