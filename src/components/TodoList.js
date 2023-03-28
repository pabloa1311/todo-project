import React from 'react'
import "../styles/todoList.css"

function TodoList(props) {
  return (
   <section>
        <ul>
            {props.children}
        </ul>
   </section>
  )
}

export default TodoList