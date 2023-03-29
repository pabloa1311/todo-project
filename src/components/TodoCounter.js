import React from 'react'
import "../styles/todoCounter.css"

function TodoCounter(props) {

  const {total, completed} = props

  return (
    <h2 className='todo-counter_header'>Has completado {completed} de {total} tareas.</h2>
  )
}

export default TodoCounter