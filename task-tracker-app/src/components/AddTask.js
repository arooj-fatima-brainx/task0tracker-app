import React, {useState} from "react";

const AddTask = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="taskContainer">
      <form onSubmit={(e) => {
        onSubmit(e, title, description)
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
