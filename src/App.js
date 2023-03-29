// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import { useState } from "react";

const deftodos = [
  {text: "Buscar el hotel", completed: false},
  {text: "Comprar los tiquetes", completed: false},
  {text: "Empacar la maleta", completed: false}
]

function App() {

  const [todos, setTodos] = useState(deftodos)

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

  const completeTodo = (text) => {
      
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]

    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    setTodos(newTodos)
  }

  const deleteTodo = (text) => {
      
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]

    newTodos.splice(todoIndex, 1)
    setTodos(newTodos)
  }

  const addTodo = () => {
    const newTodos = [...todos]

    newTodos.push({text: searchValue, completed: false})

    setTodos(newTodos)
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
      />
      
    </>
  );
}

export default App;
