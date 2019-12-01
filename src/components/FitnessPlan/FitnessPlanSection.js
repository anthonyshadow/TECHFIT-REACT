import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Row, Col, Button, Badge } from "react-bootstrap";
import FitnessCard from '../FitnessPlan/FitnessCard'
import "bootstrap/dist/css/bootstrap.min.css";

const FitnessPlanSection = ({user, dispatch, workoutList}) => {
  const rowStyle = { minHeight: "300px", margin: "200px 0px" };



  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  // const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  const [counter, setCounter] = useState(0)

  const handleWorkoutCount = () => {
    setCounter(counter + 1)
  }

  const addSelectedWorkout = workout => {
    setSelectedWorkouts([...selectedWorkouts, workout]);
    handleWorkoutCount();
    console.log("Selected Workout", selectedWorkouts)
  }



  const resetWorkoutList = () => {
    setSelectedWorkouts([])
    setCounter(0)
  }



 const handleWorkoutSend = (e) => {
  console.log('Database Submit', selectedWorkouts)
  const postData = {
    user_id: user.id,
    workout_id: selectedWorkouts[0].id,
    name: selectedWorkouts[0].name,
    difficulty: selectedWorkouts[0].difficulty,
    workout_description: selectedWorkouts[0].workout_description,
    image_url: selectedWorkouts[0].image_url,
    video_url:selectedWorkouts[0].video_url,
    
  }
  
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }
  };
    axios
    .post("/api/user-workouts", postData, axiosConfig)
    .then(res => {

     console.log('success', res)
     
    })
    .catch(err => {
      console.log("AXIOS ERROR:", err);
    });

  console.log(postData)
};

console.log("workout", workoutList)





  return (


    <Row style={rowStyle} className=" p-4">
      <Col lg={12} className=" d-flex flex-column "         style={{
          display: "flex",
          alignItems: "center"
      }}>

        <h1 style={{marginBottom: "50px"}}>Workouts List Display</h1>

        <div style={{marginTop: "30px"}}>
        
          {workoutList.map((r, i) => (
            <FitnessCard
              addSelectedWorkout={addSelectedWorkout}
              handleWorkoutSend={handleWorkoutSend}
              resetWorkoutList={resetWorkoutList}
              
              key={i}
              id={r.id}
              image_url={r.image_url}
              name={r.name}
              workout_description={r.workout_description}
              difficulty={r.difficulty}
              video_url={r.video_url}
              

            />


          ))}
        </div>

      </Col>
    </Row>
  );
}

export default FitnessPlanSection;
