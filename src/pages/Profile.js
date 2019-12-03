import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";
import ProfileInfo from "../components/Profile/ProfileInfoSection/ProfileInfo";
import SavedItems from "../components/Profile/SavedItemsSection/SavedItems"

import Tracker from "../components/liquids/Tracker";
import Incrementer from "../components/liquids/Incrementer";
import LiquidBar from "../components/liquids/LiquidBar";
import LiquidPie from "../components/liquids/LiquidPie";

const ProfilePage = ({ user, dispatch, userWorkoutList, userMealList }) => {
  //comment

  if (user) {
    console.log('userid profile section copy', user.id)
  }

  function handleIncrease(event) {
    console.log(event);
  }

  function handleDecrease(event) {
    console.log(event);
  }


    return (

      <Container className="" fluid={true}>
        <Navbar user={user} />
        <ProfileInfo user={user} />

        <Row style={{ borderBottom: "1px solid black" }}>
        <Col lg={4} style={{ borderRight: "1px solid black" }}>
          <Tracker
            waterCounter={() =>
            <Incrementer 
              name={'Water '} 
              user={user}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />}
            coffeeCounter={() =>
            <Incrementer 
              name={'Coffee'} 
              user={user}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />}
            sodaCounter={() =>
            <Incrementer 
              name={'Soda '} 
              user={user}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />}
            otherCounter={() =>
            <Incrementer 
              name={'Other '} 
              user={user} 
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />}
            />
          </Col>
          <Col lg={8}>
            <h3 className="text-center" style={{ marginTop: "15px" }}>
              {" "}
              Liquid Consumption Chart 
            </h3>
        
            <Row>
            <Col>
              <LiquidBar />
            </Col>
            
            <Col>
              <LiquidPie />
            </Col>
            </Row>
          </Col>
      </Row>
        {
          user &&
          <SavedItems userId={user.id} dispatch={dispatch} user={user} userWorkoutList={userWorkoutList} userMealList={userMealList} />
        }

        <Footer />
      </Container>
    )
}

  

export default ProfilePage;



