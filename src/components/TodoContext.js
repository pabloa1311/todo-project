import React from "react";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_VP_V1", []);

  const [searchValue, setSearchValue] = useState("");

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (searchValue.length === 0) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);

    const newTodos = [...todos];

    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);

    const newTodos = [...todos];

    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = () => {
    const newTodos = [...todos];

    newTodos.push({ text: searchValue, completed: false });

    saveTodos(newTodos);
    setSearchValue("");
  };

  return (
    <TodoContext.Provider value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        completeTodo,
        searchValue,
        setSearchValue,
        searchedTodos,
        deleteTodo,
        addTodo
    }}>{props.children}</TodoContext.Provider>
  );
}

export {TodoContext, TodoProvider}
