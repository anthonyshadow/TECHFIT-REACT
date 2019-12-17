import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import {SET_LOGIN} from '../../reducers/appReducer'
import axios from 'axios'



const LoginForm = (props) => {

  const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
 
  const [msg, setMsg] = useState('');
  console.log("render with", msg);

  const resetForm = () => {
    setEmail('')
    setPassword('')
  };
  const print = (e) => {
    e.preventDefault()
  console.log(email,password)
  }


  const handleLogin = e => {
    e.preventDefault();
    const postData = {
      email: email,
      password: password
    };
    const axiosConfig = {
      headers: {
        
        "Content-Type": "application/json;charset=UTF-8",
        //"Access-Control-Allow-Origin": "*"
      }
    };

    // props.dispatch({
    //   type: SET_USER_LOADING
    // })
   
    axios
      .post("/api/users/login", postData, axiosConfig)
     
      .then(res => { 
        console.log( "Login Res Data",res.data)
        setMsg(res.data.message);
        console.log('set the message', res.data.message);
        if (res.data.token) {
        console.log("token received");
        //setLogin(true);
        localStorage.setItem("token", res.data.token);
        resetForm();
         props.dispatch({
           type: SET_LOGIN,
           login:true
           
          })
          
          // getUserInfo();
          
          
        }
        // console.log("response from server>>>", res.data);
      })
      .catch(err => {
        // setMsg(err);
        console.log("AXIOS ERROR:", err);
      });
  };

  

  // // const getUserInfo = () => {
  // //   console.log("getting user info")
  // //   const axiosConfig = {
  // //     headers: {
  // //       Authorization:`Bearer ${localStorage.getItem('token')}`,
  // //       "Content-Type": "application/json;charset=UTF-8",
  // //       "Access-Control-Allow-Origin": "*"
  // //     }
  // //   };

  //   axios
  //     .get("/api/users/user-info", axiosConfig)
  //     .then(res => {
  //       setMsg(res.data)
  //       props.dispatch({
  //         type: SET_USER,
  //         user: res.data
  //       })
  //     })
  //     .catch(e => {
  //       console.log("AXIOS ERROR: ", e);
  //     })
  // };

  return (
       <Fragment>
      {localStorage.getItem("token") && <Redirect to="/" />}
      {!localStorage.getItem("token") && (
        <Row
          style={{ marginTop: "200px", marginBottom: "200px" }}
          className="p-4  d-flex justify-content-center "
        >
          <Col style={{ maxWidth: "600px" }} lg={12}>
            <Form onSubmit={handleLogin} style={{ minWidth: "600px" }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  name="email"
                 onChange={(event) => {
													setEmail(event.target.value);
												}}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  name="password"
                  onChange={(event) => {
													setPassword(event.target.value);
												}}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "50px",
                  filter: "grayscale(100%)"
                }}
              >
                Login
              </Button>
             {msg && <p className='text-danger pt-2' > {msg} </p>
               }
              <Form.Text className="text-muted mt-4">
                <span> Don't have an account? </span>
                <Link to="/register">Register!</Link>.
              </Form.Text>
            </Form>
          </Col>
        </Row>
      )}
    </Fragment>
  
  );
}

export default LoginForm;







// export default (props) => {
 
  
//   const [form, setValues] = useState({
//     email: "",
//     password: ""
//   });
//   const [msg, setMsg] = useState([]);
//   console.log(msg)
//   const resetForm = () => {
//     setValues({
//       email: "",
//       password: ""
//     });
//   };


//   const handleFieldChange = e => {
//     setValues({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleLogin = e => {
//     e.preventDefault();
//     const postData = {
//       email: form.email,
//       password: form.password
//     };
//     const axiosConfig = {
//       headers: {
        
//         "Content-Type": "application/json;charset=UTF-8",
//         //"Access-Control-Allow-Origin": "*"
//       }
//     };

//     props.dispatch({
//       type: SET_USER_LOADING
//     })
   
//     axios
//       .post("/api/users/login", postData, axiosConfig)
     
//       .then(res => { 
//         console.log( "Login Res Data",res.data)
//         setMsg(res.data.message);
//         if (res.data.token) {
//         console.log("token received");
//         //setLogin(true);
//          props.dispatch({
//            type: SET_LOGIN,
//            login:true
           
//           })
//           localStorage.setItem("token", res.data.token);
//           getUserInfo();
          
//           resetForm();
         
         
//         } 
//         // console.log("response from server>>>", res.data);
//       })
//       .catch(err => {
//         // setMsg(err);
//         console.log("AXIOS ERROR:", err);
//       });
//   };

//   const getUserInfo = () => {
//     console.log("getting user info")
//     const axiosConfig = {
//       headers: {
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         "Content-Type": "application/json;charset=UTF-8",
//         "Access-Control-Allow-Origin": "*"
//       }
//     };

//     axios
//       .get("/api/users/user-info", axiosConfig)
//       .then(res => {
//         setMsg(res.data)
//         props.dispatch({
//           type: SET_USER,
//           user: res.data
//         })
//       })
//       .catch(e => {
//         console.log("AXIOS ERROR: ", e);
//       })
//   };
// //-------
// useEffect(() => {
//   console.log('mounted');
//   return () => console.log('unmounting...');
// })  // <-- add this empty array here
  
//   return (
    {/* <Fragment>
      {localStorage.getItem("token") && <Redirect to="/" />}
      {!localStorage.getItem("token") && (
        <Row
          style={{ marginTop: "200px", marginBottom: "200px" }}
          className="p-4  d-flex justify-content-center "
        >
          <Col style={{ maxWidth: "600px" }} lg={12}>
            <Form onSubmit={handleLogin} style={{ minWidth: "600px" }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={form.email}
                  name="email"
                  onChange={handleFieldChange}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={form.password}
                  name="password"
                  onChange={handleFieldChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "50px",
                  filter: "grayscale(100%)"
                }}
              >
                Login
              </Button>
             {msg && <p className='text-danger pt-2' ></p>}
              <Form.Text className="text-muted mt-4">
                <span> Don't have an account? </span>
                <Link to="/register">Register!</Link>.
              </Form.Text>
            </Form>
          </Col>
        </Row>
      )}
    </Fragment>
  ); */}
// };
