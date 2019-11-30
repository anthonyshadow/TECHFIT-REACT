import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
 import Profile from "./Profile";
import MealPlan from './MealPlan'
import Login from "./Login";
import Register from "./Register";
import appReducer, { SET_USER } from "../reducers/appReducer";
import useProfileTokenUser from "../handlers/profile_token_user";
import PrivateRoute from './PrivateRoute';
import axios from 'axios';
const Routes = (props) => {
  //state,dispatch
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    mealList: [],
    workoutList: [],
    login: null,
    userLoading: true
  });

  useProfileTokenUser(dispatch, state.login, state.userLoading);

  useEffect(() => {
    console.log("getting user info")
    const axiosConfig = {
      headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios
      .get("/api/users/user-info", axiosConfig)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: SET_USER,
          user: res.data
        })
      })
      .catch(e => {
        console.log("AXIOS ERROR: ", e);
      })
  }, [state.login])


  // Functions
  // const checkAuth = () => {
  //   if (localStorage.getItem("token")) {
  //     console.log("token is true", localStorage.getItem("token"))
  //     return true;
  //   } else {
  //     console.log("token is false",localStorage.getItem("token"))
  //     return false;
  //   }
  // };
  // // const auth = () => {
  //   if (checkAuth()) {
  //     console.log('redirect to /');
  //     // window.location.href = "/";
  //     // props.history.push('/')
  //     return <Redirect to='/' />
  //   }
  // };

  // Render
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={() => <Home />} />
        <Route path="/login" component={() => <Login login={state.login}  dispatch={dispatch} />} />
        <Route path="/register" component={() => <Register />} />
  
        <PrivateRoute
          path="/meal-plan"
          component={() => <MealPlan dispatch={dispatch} login={state.login}  mealList={state.mealList} user={state.user} />}
        />
        <PrivateRoute
          path="/"
          component={() => <Profile userLoading={state.userLoading}  dispatch={dispatch} mealList={state.mealList} user={state.user} />}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
