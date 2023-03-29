import React from 'react'
import "../styles/todoSearch.css"


function TodoSearch({searchValue, setSearchValue}) {
    
    const onValueChange = (e) => {
        setSearchValue(e.target.value)
    }
  return (
    <>
    <input className="TodoSearch" placeholder="¿Qué quieres hacer hoy?"
    value={searchValue}
    onChange={onValueChange} />
    </>
  )
}

export default TodoSearch