import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: localStorage.getItem('token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
}

const authContainer = createSlice({
  name: 'authContainer',
  initialState,
  reducers: {
    loginSuccessful: (state, action) => {
      state.isLoggedIn = true
      localStorage.setItem('client', action.payload.client)
      localStorage.setItem('uid', action.payload.uid)
      localStorage.setItem('token', action.payload['access-token'])
      state.uid = localStorage.getItem('uid')
      state.client = localStorage.getItem('client')
      state.accessToken = localStorage.getItem('token')
    },
    logoutSuccessful: (state, action) => {
      state.isLoggedIn = false
      localStorage.setItem('client', '')
      localStorage.setItem('uid', '')
      localStorage.setItem('token', '')
      state.uid = localStorage.getItem('uid')
      state.client = localStorage.getItem('client')
      state.accessToken = localStorage.getItem('token')
    }
  }
})
export default authContainer.reducer
export const { loginSuccessful, logoutSuccessful } = authContainer.actions