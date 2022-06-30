import UpdateModal from "./UpdateModal";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { modifyTdlist, removeTdlist } from "../../actions/todoActions";

const Task = ({tdlist}) => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authContainer)

  return (
    <li className="item" tdlist={tdlist} key={tdlist.id}>
      <input
        className="itemCheckbox"
        type="checkbox"
        checked={tdlist.done}
        onChange={(e) => modifyTdlist(e, tdlist.id, dispatch, auth)}
      />
      <label className="itemDisplay">{tdlist.title}</label>
      <span
        className="removeItemButton"
        onClick={(e) => removeTdlist(tdlist.id, dispatch, auth)}
      >
                    x
      </span>
      <UpdateModal tdlist={tdlist}/>
    </li>
  )
}

export default Task
