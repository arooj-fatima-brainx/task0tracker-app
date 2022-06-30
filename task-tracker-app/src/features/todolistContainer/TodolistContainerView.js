import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTdlists } from "../../actions/todoActions";
import Tasks from  './Tasks'
import AddTask from './AddTask'
import '../../App.css'

const TodolistContainerView = () => {
  const tdlists = useSelector((state) => state)
  const auth = useSelector((state) => state.authContainer)

  const dispatch = useDispatch()

  useEffect(() => {
    getTdlists(dispatch, auth)
  }, [])
  return (
    <React.Fragment>
      <AddTask />
      {tdlists.todolistContainer.tdlists.length > 0 && <Tasks tdlists={tdlists}/>}
    </React.Fragment>
  )
}

export default TodolistContainerView