import React from "react";
import Task from "./Task";

const Tasks = ({tdlists, onChange, onDelete, onSubmit}) => {
  return (
    <div className="wrapItems">
      <ul className="listItems">
        {tdlists.todolistContainer.tdlists.map((tdlist, index) => {
          return (
            <Task key={index} tdlist={tdlist} onChange={onChange} onDelete={onDelete}
                  onSubmit={onSubmit}/>
          );
        })}
      </ul>
    </div>
  )
}

export default Tasks
