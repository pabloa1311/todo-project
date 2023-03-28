import React from 'react'
import "../styles/todoSearch.css"

function TodoSearch() {
    const onValueChange = (e) => {
        console.log(e.target.value)
    }
  return (
    <input className="TodoSearch" placeholder="cebolla"
    onChange={onValueChange} />
  )
}

export default TodoSearch