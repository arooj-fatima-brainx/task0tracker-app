import UpdateModal from "./UpdateModal";
import React from "react";

const Task = ({tdlist, onChange, onDelete, onSubmit}) => {
  return (
    <li className="item" tdlist={tdlist} key={tdlist.id}>
      <input
        className="itemCheckbox"
        type="checkbox"
        checked={tdlist.done}
        onChange={(e) => onChange(e, tdlist.id)}
      />
      <label className="itemDisplay">{tdlist.title}</label>
      <span
        className="removeItemButton"
        onClick={(e) => onDelete(tdlist.id)}
      >
                    x
      </span>
      <UpdateModal onSubmit={onSubmit} tdlist={tdlist}/>
    </li>
  )
}

export default Task
