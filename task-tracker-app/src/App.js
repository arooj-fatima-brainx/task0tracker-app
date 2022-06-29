import React from "react";
import './App.css'
import TodolistContainerView from './features/todolistContainer/TodolistContainerView'
import LoginView from "./features/authenticationContainer/LoginView";
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";

function App() {
  const authContainer = useSelector((state) => state.authContainer)
  return (
    <div className="mainContainer">
      <div className="topHeading">
        <h1>A Simple To-Do List App</h1>
        <Button>Logout</Button>
      </div>
      {authContainer.isLoggedIn ? <TodolistContainerView /> : <LoginView/> }
    </div>
  )
}

export default App