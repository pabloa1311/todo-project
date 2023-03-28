// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";

const todos = [
  {text: "Buscar el hotel", completed: true},
  {text: "Comprar los tiquetes", completed: false},
  {text: "Empacar la maleta", completed: false}
]

function App() {
  return (
    <>
      <TodoCounter />
      
      <TodoSearch />
      
      <TodoList>
        {todos.map((todo) => {
          return (
            <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed}
            />
        )})}
      </TodoList>
      <CreateButton />
      
    </>
  );
}

export default App;
