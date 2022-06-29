import React from "react";
import './App.css'
import TodolistContainerView from './features/todolistContainer/TodolistContainerView'
import LoginView from "./features/authenticationContainer/LoginView";
import { logOut } from "./actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";

function App() {
  const authContainer = useSelector((state) => state.authContainer)

  const dispatch = useDispatch()
  return (
    <div className="mainContainer">
      <div className="topHeading">
        <h1>A Simple To-Do List App</h1>
        {authContainer.accessToken && <Button onClick={(e) => logOut(dispatch)}>Logout</Button>}
      </div>
      {authContainer.accessToken ? <TodolistContainerView /> : <LoginView/> }
    </div>
  )
}

export default App