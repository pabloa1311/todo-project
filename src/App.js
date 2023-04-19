// import './App.css';

import CreateButton from "./components/CreateButton";
import TodoCounter from "./components/TodoCounter";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import { TodoProvider, TodoContext } from "./components/TodoContext";
import Modal from "./components/Modal";
import TodoForm from "./components/TodoForm";

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
          completeTodo,
          searchValue,
          setSearchValue,
          searchedTodos,
          deleteTodo,
          addTodo,
          openModal,
          setOpenModal,
          onAdd
        }) => {
          return (
            <>
              <TodoCounter />

              <TodoSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
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
              <CreateButton 
              addTodo={addTodo} searchValue={searchValue} 
              setOpenModal={setOpenModal}
              />
              {openModal && (
                <Modal                             
                >
                  <TodoForm onAdd={onAdd} />
                </Modal>
              )}
            </>
          );
        }}
      </TodoContext.Consumer>
    </TodoProvider>
  );
}

export default App;
