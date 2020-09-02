import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, Card, Form, InputGroup, FormControl } from 'react-bootstrap'

const Sprint = ({ sprint }) => {
  return (
    <Form.Group className="row">
      <label htmlFor="SprintId" className="col-sm-2 col-form-label">Sprint</label>
      <div className="col-sm-2">
        {sprint &&
          <a id="SprintId" className="badge badge-pill badge-primary p-2"> {sprint.name} </a>
        }
      </div>
    </Form.Group>
  )
}

const LabelContainer = ({ labels }) => {
  return (
    <Form.Group className="row">
      <label htmlFor="SprintId" className="col-sm-2 col-form-label">Labels</label>
      <div className="col-sm-2 center">
        {labels && labels.map(label => {
          return (
            <a key={label.id} className="badge badge-pill badge-info p-2 mt-1"> {label.description} </a>
          )
        })}
      </div>
    </Form.Group>
  )
}

const Task = ({ task }) => {
  return (
    <InputGroup key={task.id} className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Checkbox aria-label="Checkbox for done tasks" value={task.done}/>
      </InputGroup.Prepend>
      <FormControl type="text"aria-label="Task's description" value={task.description} disabled/>
    </InputGroup>
  )
}

const TasksContainer = ({ tasks }) => {
  return (
    <Form.Group className="row align-items-center">
      <div className="col-sm-2">Tasks</div>
      {tasks && tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </Form.Group>

  )
}

const UserStory = (props) => {
  const { userStory, deleteUserstory, projectId, setUserStoryEditHandler } = props
  const { title, description, weight, labels, tasks, sprint, id } = userStory
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  return (
    <Card>
      <DeleteConfirmationModal
        showModal={showModal}
        projectId={projectId}
        deleteUserstory={deleteUserstory}
        userStoryId={id}
        handleClose={handleClose} />
      <Card.Header id="headingOne">
        <h2 className="mb-0">
          <Button variant="link" className="text-left btn-block" data-toggle="collapse"
            data-target={`#collapse${id}`} aria-expanded="false" aria-controls={`#collapse${id}`}>{title}</Button>
        </h2>
      </Card.Header>
      <div id={`collapse${id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
        <Card.Body>
          <Form.Group className="row">
            <Form.Label className="col-sm-2 col-form-label">Title</Form.Label>
            <Form.Control className="col-sm-10 form-control-plaintext" type="text" id="title" value={title} />
          </Form.Group>
          <Form.Group className="row">
            <Form.Label className="col-sm-2 col-form-label">Description</Form.Label>
            <Form.Control className="col-sm-10 form-control-plaintext" type="textarea" id="description" value={description} />
          </Form.Group>
          <Form.Group className="row">
            <Form.Label className="col-sm-2 col-form-label">Weight</Form.Label>
            <Form.Control className="col-sm-10 form-control-plaintext" type="text" id="weight" value={weight} />
          </Form.Group>
          <Sprint sprint={sprint} />
          <LabelContainer labels={labels} />
          <TasksContainer tasks={tasks} />
          <div class="card-body text-right">
            <Button variant="primary" className="mr-2" onClick={() => setUserStoryEditHandler(userStory)}><FontAwesomeIcon icon="edit" />Edit</Button>
            <Button variant="danger" onClick={() => handleShowModal()}><FontAwesomeIcon icon="trash" />Delete</Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  )
}


const DeleteConfirmationModal = ({ showModal, userStoryId, projectId, deleteUserstory, handleClose }) => {
  const handleDeleteUserStory = () => {
    deleteUserstory(projectId, userStoryId)
    handleClose()
  }
  return (
    <Modal show={showModal} onHide={handleClose}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The User Story will be eliminated and all the information related to it</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="danger" onClick={handleDeleteUserStory}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default UserStory
