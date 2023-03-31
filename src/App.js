// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import { useState } from "react";

// const deftodos = [
//   {text: "Buscar el hotel", completed: false},
//   {text: "Comprar los tiquetes", completed: false},
//   {text: "Empacar la maleta", completed: false}
// ]

function App() {

  const localStorageTodos = localStorage.getItem("TODOS_VP_V1")
  let parsedTodos

  if(!localStorageTodos) {
    localStorage.setItem("TODOS_VP_V1", JSON.stringify([]))
    parsedTodos = []
  } else {
    parsedTodos = JSON.parse(localStorageTodos)
  }

  const [todos, setTodos] = useState(parsedTodos)

  const  [searchValue, setSearchValue] = useState("")

  const completedTodos = todos.filter(todo => !!todo.completed).length
  const totalTodos = todos.length
  
  let searchedTodos = []

  if (searchValue.length === 0) {
    searchedTodos = todos
  } else {

    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase()
      const searchText = searchValue.toLowerCase()

      return todoText.includes(searchText)

    })

  }

  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos)

    localStorage.setItem("TODOS_VP_V1", stringifiedTodos)

    setTodos(newTodos)

  }

  const completeTodo = (text) => {
      
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]

    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    saveTodos(newTodos)
  }

  const deleteTodo = (text) => {
      
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]

    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }

  const addTodo = () => {
    const newTodos = [...todos]

    newTodos.push({text: searchValue, completed: false})

    saveTodos(newTodos)
    setSearchValue("")
  }

  return (
    <>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
      
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      
      <TodoList>
        {searchedTodos.map((todo) => {
          return (
            <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
        )})}
      </TodoList>
      <CreateButton
        addTodo={addTodo}
        searchValue={searchValue}
      />
      
    </>
  );
}

export default App;
