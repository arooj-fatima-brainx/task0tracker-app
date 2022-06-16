import React, {useState} from "react";
import {useDispatch} from "react-redux";

const AddTask = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()

  return (
    <div className="taskContainer">
      <form onSubmit={(e) => {
        onSubmit(e, title, description, dispatch)
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
