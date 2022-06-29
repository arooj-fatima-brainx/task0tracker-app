import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  uid: '',
  client: ''
}

const authContainer = createSlice({
  name: 'authContainer',
  initialState,
  reducers: {
    loginSuccessful: (state, action) => {
      state.isLoggedIn = true
      state.uid = action.payload.uid
      state.client = action.payload.client
      state.accessToken = action.payload['access-token']
      debugger
    }
  }
})
export default authContainer.reducer
export const { loginSuccessful } = authContainer.actions