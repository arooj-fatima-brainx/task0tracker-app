import React from "react";
import './App.css'
import TodolistContainerView from './features/todolistContainer/TodolistContainerView'

function App() {
  return (
    <div className="mainContainer">
      <div className="topHeading">
        <h1>A Simple To-Do List App</h1>
      </div>
      <TodolistContainerView />
    </div>
  )
}

export default App