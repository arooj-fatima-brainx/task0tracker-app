import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'react-bootstrap';
import React, {useState} from 'react';

const UpdateModal = ({tdlist, onSubmit}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(tdlist.title)
  const [description, setDescription] = useState(tdlist.description)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Button className="editButton" color="danger" onClick={toggle}>Edit</Button>
      <Modal show={isOpen} onHide={toggle}>
        <div className="taskContainer">
          <form onSubmit={(e) => {
            toggle()
            onSubmit(e, tdlist.id, title, description)
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
