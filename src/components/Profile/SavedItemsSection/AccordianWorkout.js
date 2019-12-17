import React, { useState} from 'react'
import { Row, Col, Button, Accordion, Card, Modal, ButtonToolbar } from "react-bootstrap";
import {  SET_DELETE_WORKOUTS_LIST } from "../../../reducers/appReducer";
import axios from 'axios'


const AccordianWorkout = (props, user) => {


  const handleDeleteWorkout = (itemId) => {
  axios({
    method: "delete", 
    url: `/api/user-workouts/${user.userId}`,
    data: {id: itemId} })
    .then (response => {
      console.log(response)
    props.dispatch({type: SET_DELETE_WORKOUTS_LIST, id: itemId })
    } )
  }

  const [modalShow, setModalShow] = React.useState(false);
  

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-center">
            Your Workouts presented by TechFit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div style={{overflow: "hidden", position: "relative", padding: "20px"}}> 
          <iframe  className="fluid" style={{minHeight: "75vh", minWidth: "75vh"}} src={props.video_url} allowFullScreen></iframe>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }




  return (

    <Accordion >
        <Card>
          <Card.Header>
          <Row>
              <Col lg={6}>
            <Accordion.Toggle className="font-weight-bold" as={Button} size="lg" variant="link" eventKey="0" style={{ color: "black" }}>
              {props.name}
              </Accordion.Toggle>
              </Col>
              <Col lg={6} className="text-right">
              <Button 
              size="sm"
              variant="secondary"
              style={{marginTop: "10px"}}
              onClick={()=> handleDeleteWorkout(props.id)}>
                Delete
                </Button>
              </Col>
              
          
          </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

            <Row className="pt-4 pb-4 rounded">
        <Col lg={6}>
          <img
            style={{ height: "200px", border: "none" }}
            className="img-fluid img-thumbnail"
            src={props.image_url}
            alt="fitness"
          />
        </Col>
        <Col lg={6}>
          <h5>{props.name}</h5>
          <p>
          {props.workout_description}
          </p>
          <div className="d-flex flex-row justify-content-between">
            <span>
              <i className="far fa-clock"></i> : Level Of Difficulty:{props.difficulty}
            </span>
            <ButtonToolbar>
            <Button variant="info" size="sm" onClick={() => setModalShow(true)}>
      Demo Video <i className="far fa-plus-square"></i>
      </Button>
      <MyVerticallyCenteredModal
              {...props}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </ButtonToolbar>
            
          </div>
        </Col>
      </Row>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
    </Accordion>
  )
}

export default AccordianWorkout;
