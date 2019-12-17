import React,{Fragment} from 'react';
import { Row, Col, Button, Modal, ButtonToolbar } from "react-bootstrap";

const WorkoutCardInfo = props => {
    
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
        <iframe style={{height: "75vh", width: "75vh"}} src={props.video_url} allowFullScreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  
  return (
         <Fragment>
      <Row className="">
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
    </Fragment>
    );
}

export default WorkoutCardInfo;