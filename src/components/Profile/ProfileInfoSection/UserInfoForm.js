import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
const UserInfoForm = ({ user }) => {
  const userID = user.id;
  const [form, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: '',
    weight: '',
    image_url:''
  });

  const [msg, setMsg] = useState("");
  const resetForm = () => {
    setValues({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: '',
      weight: '',
      image_url:''
    });
  };

  const handleFieldChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUserChangeData = e => {
    e.preventDefault();

    const postData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      age: form.age,
      weight: form.weight,
      image_url:form.image_url
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .put(`api/users/${userID}`, postData, axiosConfig)
      .then(res => {
        setMsg(res.data.message);
        console.log("axios res.data>>>>", res.data);
        resetForm();
        window.location.reload();
      })
      .catch(err => {

        console.log("AXIOS ERROR:", err);
      });
  };



  return (
    <Row
      className="p-4  d-flex justify-content-center "
    >
      <Col lg={12}>
        <Form onSubmit={handleUserChangeData}>
          <Form.Group>
            <Form.Control
              value={form.first_name}
              name="first_name"
              onChange={handleFieldChange}
              type="text"
              placeholder={user.first_name}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={form.last_name}
              name="last_name"
              onChange={handleFieldChange}
              type="text"
              placeholder={user.last_name}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={form.email}
              name="email"
              onChange={handleFieldChange}
              type="email"
              placeholder={user.email}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              value={form.password}
              name="password"
              onChange={handleFieldChange}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={form.age}
              name="age"
              onChange={handleFieldChange}
              type="number"
              placeholder={user.age || "Age"}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={form.weight}
              name="weight"
              onChange={handleFieldChange}
              type="number"
              placeholder="Weight"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={form.image_url}
              name="image_url"
              onChange={handleFieldChange}
              type="text"
              placeholder="profile pic (http://)"
            />
          </Form.Group>
          
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              marginTop: "10px",
              filter: "grayscale(100%)"
            }}
          >
            <i className="far fa-paper-plane"></i>
            <span> Update</span>
          </Button>
          {msg && <p className="text-danger pt-2">{msg}</p>}
        </Form>
      </Col>
    </Row>
  );
  
};

export default UserInfoForm;
