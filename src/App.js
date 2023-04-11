// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import { TodoProvider, TodoContext } from "./components/TodoContext";

// const deftodos = [
//   {text: "Buscar el hotel", completed: false},
//   {text: "Comprar los tiquetes", completed: false},
//   {text: "Empacar la maleta", completed: false}
// ]

function App() {
  return (
    <TodoProvider>
      <TodoContext.Consumer>
          {({
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
          }) => {
            return (
              <>
                <TodoCounter/>

                <TodoSearch
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
                <TodoList>
                  {loading && <p>Cargando...</p>}
                  {error && <p>Hubo un error...</p>}
                  {!loading && !searchedTodos.length && (
                    <h1 style={{ textAlign: "center" }}>
                      Crea tu primera tarea
                    </h1>
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
          }}
      </TodoContext.Consumer>
    </TodoProvider>
  );
}

export default App;
