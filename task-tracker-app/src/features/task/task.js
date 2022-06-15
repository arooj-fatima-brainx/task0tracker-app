import UpdateModal from "./UpdateModal";
import {Button} from "react-bootstrap";
import React, {useState} from "react";

const Task = ({tdlist, onChange, onClick, onSubmit}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => {
  //   setIsOpen(!isOpen)
  // }
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
        onClick={(e) => onClick(e, tdlist.id)}
      >
                    x
      </span>
      {/*<Button className="editButton" color="danger" onClick={() =>toggle()}>Edit</Button>*/}
      <UpdateModal onSubmit={onSubmit} tdlist={tdlist}/>
    </li>
  )
}

export default Task
