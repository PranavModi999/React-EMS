/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable import/extensions */
import React from "react";
import {
  Button, Col, Form, Row, Toast,
} from "react-bootstrap";

import GraphQlQueries from "../server/graphQlQueries.js";

export default class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      show: false,
      validated: false,
    };
    this.addEmployeeHandler = this.addEmployeeHandler.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState(st => ({ show: !st.show }));
  }

  addEmployeeHandler(evt) {
    evt.preventDefault();

    // get form data
    const formValues = {};
    new FormData(evt.target).forEach((value, key) => {
      if (key === "Age") formValues[key] = parseInt(value, 10);
      
      else formValues[key] = value.trim();
    });
    formValues.CurrentStatus = "1";
    const form = evt.currentTarget;

    if (form.checkValidity() === false) {
      evt.stopPropagation();
      this.setState({ validated: true });
    } else {
      const formValues = {};
      new FormData(form).forEach((value, key) => {
        if (key === "Age") formValues[key] = parseInt(value, 10);
        else formValues[key] = value.trim();
      });
      formValues.CurrentStatus = "1";

      let error = "";

      if (formValues.FirstName === "") error += "\n First name is required";
      if (formValues.LastName === "") error += "\n Last name is required";
      if (formValues.Age > 70 || formValues.Age < 20) {
        error += "\n Age must be a number between 20 to 70";
      }

      if (error.length > 0) {
        this.setState({ error });
      } else {
        this.setState({
          show: GraphQlQueries.createNewEmployee(formValues),
        });
      }
    }
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col className="col-10">
          <center>
            <h3 className="mb-3">
              <u>ADD EMPLOYEE</u>
            </h3>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.addEmployeeHandler}
            >
              <Row className="justify-content-center text-start my-2">
                <Form.Group as={Col} md="4">
                  <Form.Label className="ms-3">First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstName"
                    id="firstName"
                    placeholder="Enter first name"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    invalid first name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="LastName"
                    id="lastName"
                    placeholder="Enter last name"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    invalid last name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="justify-content-center text-start my-2">
                <Form.Group as={Col} md="4">
                  <Form.Label className="ms-3">Age:</Form.Label>
                  <Form.Control
                    type="number"
                    name="Age"
                    id="age"
                    placeholder="Enter age"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Age must be between 20 to 70
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Joining Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="DateOfJoining"
                    id="dateOfJoining"
                    placeholder="Enter joining Date"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    invalid date of joining
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    id="DOB"
                    placeholder="Enter Date of Birth"
                    required
                  />
                
                </Form.Group>

              </Row>
              <Col xs={5} className="my-2">
                <label htmlFor="title">Title:</label>
                <Form.Select id="title" name="Title">
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </Form.Select>
              </Col>
              <Col xs={5} className="my-2">
                <label htmlFor="department">Department:</label>
                <Form.Select id="department" name="Department">
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </Form.Select>
              </Col>
              <Col xs={5} className="my-2">
                <label htmlFor="employeeType">Employee Type:</label>
                <Form.Select name="EmployeeType" id="EmployeeType">
                  <option value="FullTime">FullTime</option>
                  <option value="PartTime">PartTime</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                  <Form.Control.Feedback type="invalid">
                    select employee type
                  </Form.Control.Feedback>
                </Form.Select>
              </Col>
              <span>
                <pre>{this.state.error}</pre>
              </span>
              <Button type="submit" variant="dark">
                Add Employee
              </Button>
            </Form>
            <Toast
              bg="success"
              show={this.state.show}
              onClose={this.toggleShow}
              className="m-5 position-absolute bottom-0 end-0"
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Created</strong>
              </Toast.Header>
              <Toast.Body>Employee created successfully</Toast.Body>
            </Toast>
          </center>
        </Col>
      </Row>
    );
  }
}
