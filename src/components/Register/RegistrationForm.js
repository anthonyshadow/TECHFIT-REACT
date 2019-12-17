import React,{useState,Fragment} from "react";
import { Link,Redirect } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import axios from 'axios'
export default () => {
 
  
  

  const [msg, setMsg] = useState("");

const [form, setValues] = useState({
  first_name: '',
  last_name:'',
  email: "",
  password: ""
});

const resetForm = () => {
  setValues({
    first_name: '',
  last_name:'',
  email: "",
  password: ""
  });
};
  
const handleFieldChange = e => {
  setValues({
    ...form,
    [e.target.name]: e.target.value
  });
};

  
const handleLogin = e => {
  e.preventDefault();
  const postData = {
    first_name: form.first_name,
    last_name:form.last_name,
    email: form.email,
    password: form.password
  };
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }
  };
  axios
    .post("/api/users", postData, axiosConfig)
    .then(res => {
      setMsg(res.data.message);
      resetForm();
    })
    .catch(err => {
      console.log("AXIOS ERROR:", err);
    });
};
 

  return (
    <Fragment>
      {msg==="You are logged in!!" && < Redirect to='/login' />}
      {/* {!msg="You are logged in!!" && ( */}
        {!msg && (<Row
      style={{ marginTop: "200px", marginBottom: "200px" }}
      className="p-4  d-flex justify-content-center "
    >
      <Col style={{ maxWidth: "600px" }} lg={12}>
        <Form onSubmit={handleLogin} style={{ minWidth: "600px" }}>
        <Form.Group >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={form.first_name}
              name='first_name'
              onChange={handleFieldChange}
              type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={form.last_name}
              name='last_name'
              onChange={handleFieldChange}
              type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            value={form.email}
              name='email'
              onChange={handleFieldChange}
              type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            value={form.password}
              name='password'
              onChange={handleFieldChange}
              type="password" placeholder="Password" />
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
            Register!
          </Button>
          {msg && <p className='text-danger pt-2' >{msg}</p>}
          <Form.Text className="text-muted mt-4">
            <span> Do you have an account? </span>
            <Link to="/login">Login!</Link>.
          </Form.Text>
        </Form>
      </Col>
    </Row>
      )}
      {msg==="Email Aready in Use!" && (<Row
      style={{ marginTop: "200px", marginBottom: "200px" }}
      className="p-4  d-flex justify-content-center "
    >
      <Col style={{ maxWidth: "600px" }} lg={12}>
        <Form onSubmit={handleLogin} style={{ minWidth: "600px" }}>
        <Form.Group >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={form.first_name}
              name='first_name'
              onChange={handleFieldChange}
              type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={form.last_name}
              name='last_name'
              onChange={handleFieldChange}
              type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            value={form.email}
              name='email'
              onChange={handleFieldChange}
              type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            value={form.password}
              name='password'
              onChange={handleFieldChange}
              type="password" placeholder="Password" />
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
            Register!
          </Button>
          {msg && <p className='text-danger pt-2' >{msg}</p>}
          <Form.Text className="text-muted mt-4">
            <span> Do you have an account? </span>
            <Link to="/login">Login!</Link>.
          </Form.Text>
        </Form>
      </Col>
    </Row>
      )}
  </Fragment>
  
  );
};


