import { configureStore } from '@reduxjs/toolkit'
import todolistContainerReducer from '../features/todolistContainer/todolitsContainer'
import authContainerReducer from '../features/authenticationContainer/authContainer'

const store = configureStore({
  reducer: {
    todolistContainer: todolistContainerReducer,
    authContainer: authContainerReducer
  },
})

export default store