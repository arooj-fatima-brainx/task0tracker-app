import { configureStore } from '@reduxjs/toolkit'
import todolistContainerReducer from '../features/todolistContainer/todolitsContainer'

const store = configureStore({
  reducer: {
    todolistContainer: todolistContainerReducer,
  },
})

export default store