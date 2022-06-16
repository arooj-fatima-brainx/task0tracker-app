import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onSubmit, modifyTdlist, removeTdlist, editTdList, getTdlists} from './todolitsContainer'
import Tasks from  './Tasks'
import AddTask from './AddTask'
import '../../App.css'

const TodolistContainerView = () => {
  const tdlists = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    getTdlists(dispatch)
  }, [])
  return (
    <React.Fragment>
      <AddTask onSubmit={onSubmit}/>
      {tdlists.todolistContainer.tdlists.length > 0 && <Tasks tdlists={tdlists} onChange={modifyTdlist} onDelete={removeTdlist} onSubmit={editTdList}/>}
    </React.Fragment>
  )
}

export default TodolistContainerView