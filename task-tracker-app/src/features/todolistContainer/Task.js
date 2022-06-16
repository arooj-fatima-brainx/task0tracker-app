import UpdateModal from "./UpdateModal";
import React from "react";
import {useDispatch} from "react-redux";

const Task = ({tdlist, onChange, onDelete, onSubmit}) => {
  const dispatch = useDispatch()
  return (
    <li className="item" tdlist={tdlist} key={tdlist.id}>
      <input
        className="itemCheckbox"
        type="checkbox"
        checked={tdlist.done}
        onChange={(e) => onChange(e, tdlist.id, dispatch)}
      />
      <label className="itemDisplay">{tdlist.title}</label>
      <span
        className="removeItemButton"
        onClick={(e) => onDelete(tdlist.id, dispatch)}
      >
                    x
      </span>
      <UpdateModal onSubmit={onSubmit} tdlist={tdlist}/>
    </li>
  )
}

export default Task
