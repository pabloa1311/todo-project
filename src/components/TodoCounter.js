import React from "react";
import "../styles/todoCounter.css";
import { TodoContext } from "./TodoContext";
import { useContext } from "react";

function TodoCounter(props) {
  const { totalTodos, completedTodos } = useContext(TodoContext);

  // const { total, completed } = props;

  return (
    <h2 className="todo-counter_header">
      Has completado {completedTodos} de {totalTodos} tareas.
    </h2>
  );
}

export default TodoCounter;
