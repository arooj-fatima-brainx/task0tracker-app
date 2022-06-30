import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { onSubmit } from "../../actions/todoActions";

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authContainer)

  return (
    <div className="taskContainer">
      <form onSubmit={(e) => {
        onSubmit(e, title, description, dispatch, auth)
        setTitle('')
        setDescription('')
      }}>
        <div>
          <label>Task</label>
          <input
            type='text'
            className="newTask"
            placeholder='Add Task'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type='text'
            className="newTask"
            placeholder='Add Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type='submit' value='Save Task' className='btn btn-block'/>
      </form>
    </div>
  )
}

export default AddTask
