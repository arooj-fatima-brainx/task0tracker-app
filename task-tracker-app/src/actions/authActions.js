import axios from "axios";
import { loginSuccessful, logoutSuccessful } from "../features/authenticationContainer/authContainer"

export const onSubmit = (e, email, password, action, dispatch) => {
  e.preventDefault()
  if (!(email && password)) {
    alert('Please enter email and password')
    return
  }
  action(email, password, dispatch)
}

export const logIn = (email, password, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  axios
    .post("/api/v1/users/sign_in", body, config)
    .then((res) => {
      dispatch(loginSuccessful(res.headers))
    })
    .catch((error) => {
      alert(error.response.data.errors[0])
    });
}

export const logOut = (dispatch) => {
  dispatch(logoutSuccessful())
}