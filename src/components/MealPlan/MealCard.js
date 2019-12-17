import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ModalCard from '../MealPlan/ModalAddMealPopUp'
const MealCard = props => {
  
  let [active, setActive] = useState(true);
  const handleClickCard = e => {
    setActive(!active);
    const meal = {
      photo_url: props.image,
      recipe_title: props.title,
      recipe_description: props.instructions,
      prep_time: props.minutes,
      servings: props.servings,
      source_url:props.url
    };
    props.addSelectedMeal(meal);
  };

  return (
     <div>
      <Row className='border rounded p-2 mt-3 mb-3 ' >
        <Col lg={3} className='p-3' 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
        <img
           
            className="img-fluid img-thumbnail"
            src={props.image}
            alt="food"
            style={{border: "none"}}
          />
        </Col>
        <Col lg={9} >
          <h5>{props.title}</h5>
         
          <p>{props.instructions}</p>
          <div className="d-flex flex-row justify-content-between">
            <span>
              <i className="far fa-clock"></i> : {props.minutes} minutes
            </span>
            <span>
              <i className="fas fa-users"></i> : {props.servings} servings
            </span>
            < ModalCard handleRecipeSend={props.handleRecipeSend} resetMealList={props.resetMealList} handleClickCard={handleClickCard} />
          </div>
          <a
            href={props.url}
            rel="noopener noreferrer"
            target="_blank"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Click to see full recipe
          </a>
        </Col>
      </Row>
      
    </div>
  );
};
export default MealCard;