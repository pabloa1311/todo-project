// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import { useState, useEffect } from "react";

// const deftodos = [
//   {text: "Buscar el hotel", completed: false},
//   {text: "Comprar los tiquetes", completed: false},
//   {text: "Empacar la maleta", completed: false}
// ]

function useLocalStorage(itemName, initialValue) {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  });

  const saveItem = (newItem) => {
    try {
      const stringifiedTodos = JSON.stringify(newItem);

      localStorage.setItem(itemName, stringifiedTodos);

      setItem(newItem);
    } catch (error) {
      setError(error)
    }
  };

  return {
    item,
    saveItem,
    loading,
    error
  };
}

function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
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
    <>
      <TodoCounter total={totalTodos} completed={completedTodos} />

      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <TodoList>
        {loading && <p>Cargando...</p>}
        {error && <p>Hubo un error...</p>}
        {!loading && !searchedTodos.length && (
          <h1 style={{ textAlign: "center" }}>Crea tu primera tarea</h1>
        )}

        {searchedTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          );
        })}
      </TodoList>
      <CreateButton addTodo={addTodo} searchValue={searchValue} />
    </>
  );
}

export default App;
