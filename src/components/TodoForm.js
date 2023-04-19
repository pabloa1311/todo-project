import React from "react";
import { TodoContext } from "./TodoContext";
import { useContext, useState } from "react";
import "../styles/todoForm.css";

function TodoForm(props) {
  const onAdd = () => {
    props.onAdd(newTodo);
  };
  const [newTodo, setNewTodo] = useState("");

  const { addTodo } = useContext(TodoContext);

  const onCancel = () => {
    addTodo();
  };

  const onValueChange = (e) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault()
    onAdd()
    setNewTodo("")
    addTodo()
  }

  return (
    <form onSubmit={onSubmit}>
      <label></label>
      <textarea
        onChange={onValueChange}
        placeholder="Viajar por el mundo"
        value={newTodo}
      />
      <div className="TodoForm-buttonContainer">
        <button
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button className="TodoForm-button TodoForm-button--add" type="submit">
          Añadir
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
