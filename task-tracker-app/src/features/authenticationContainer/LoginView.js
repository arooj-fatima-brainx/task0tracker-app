import React, {useState} from "react";
// import {useDispatch} from "react-redux";
import {logIn, onSubmit} from "../../actions/authActions";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  return (
    <div className="taskContainer">
      <h1>Log In</h1>
      <form onSubmit={(e) => {
        onSubmit(e, email, password, logIn, dispatch)
      }}>
        <input
          placeholder="email"
          className="newTask"
          type="text"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          className="newTask"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' value='Login' className='btn btn-block'/>
      </form>

    </div>
  )
}

export default Login;