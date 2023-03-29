// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import { useState } from "react";

const deftodos = [
  {text: "Buscar el hotel", completed: true},
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
              todos = {todos}
              setTodos = {setTodos}
            />
        )})}
      </TodoList>
      <CreateButton />
      
    </>
  );
}

export default App;
