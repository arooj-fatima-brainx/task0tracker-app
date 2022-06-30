import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'react-bootstrap';
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { editTdList } from "../../actions/todoActions";

const UpdateModal = ({tdlist}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(tdlist.title)
  const [description, setDescription] = useState(tdlist.description)
  const auth = useSelector((state) => state.authContainer)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const dispatch = useDispatch()
  return (
    <>
      <Button className="editButton" color="danger" onClick={toggle}>Edit</Button>
      <Modal show={isOpen} onHide={toggle}>
        <div className="taskContainer">
          <form onSubmit={(e) => {
            toggle()
            editTdList(e, tdlist.id, title, description, dispatch, auth)
          }}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <input type='submit' value='Update Task' className='btn'/>
              <Button onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default UpdateModal
