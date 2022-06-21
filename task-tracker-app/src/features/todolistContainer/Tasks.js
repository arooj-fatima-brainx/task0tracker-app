import React from "react";
import Task from "./Task";

const Tasks = ({tdlists}) => {
  return (
    <div className="wrapItems">
      <ul className="listItems">
        {tdlists.todolistContainer.tdlists.map((tdlist, index) => {
          return (
            <Task key={index} tdlist={tdlist} />
          );
        })}
      </ul>
    </div>
  )
}

export default Tasks
