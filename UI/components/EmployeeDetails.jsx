/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import {
  Button, Col, Form, Row, Toast,
} from "react-bootstrap";

import GraphQLQueries from "../server/graphQlQueries";

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      emp: null,
    };
    // bind functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateEmployeeHandler = this.updateEmployeeHandler.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  async componentDidMount() {
    // get id route parameter
    const { id } = this.props.match.params;

    try {
      // returns employee with matching id from database
      const data = await GraphQLQueries.getEmployeeById(id);

      // update state
      this.setState({ emp: data });
    } catch (error) {
      throw error;
    }
  }

  toggleShow() {
    this.setState(st => ({ show: !st.show }));
  }

  async updateEmployeeHandler(event) {
    event.preventDefault();
    try {
      // updates employee from database
      // eslint-disable-next-line react/no-access-state-in-setstate
      const result = await GraphQLQueries.updateEmployee(this.state.emp);
      console.log(this.state.emp);
      this.setState({
        show: result,
      });
    } catch (error) {
      throw error;
    }
  }

  // updats state when any input field changes
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      emp: {
        ...prevState.emp,
        [name]: value,
      },
    }));
  }

  render() {
    const { emp } = this.state;
    // TODO: change to emp.DateOfJoining
    const DateOfBirth = new Date(2000, 5, 11);

    const month = DateOfBirth.getMonth() + 1;
    const year = DateOfBirth.getFullYear();
    const day = DateOfBirth.getDate();
    if (!this.state.emp) {
      return <div>Loading...</div>;
    }
    const formattedDateOfJoining = new Date(emp.DateOfJoining)
      .toISOString()
      .split("T")[0];
    return (
      <Row className="justify-content-center">
        <Col className="col-10">
          <center>
            <h3 className="mb-3">
              <u>UPDATE EMPLOYEE</u>
            </h3>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.updateEmployeeHandler}
            >
              <Row className="justify-content-center text-start my-2">
                <Form.Group as={Col} md="4">
                  <Form.Label className="ms-3">First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstName"
                    id="firstName"
                    defaultValue={emp.FirstName}
                    placeholder="Enter first name"
                    disabled
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
                    defaultValue={emp.LastName}
                    placeholder="Enter last name"
                    disabled
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
                    defaultValue={emp.Age}
                    placeholder="Enter age"
                    disabled
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
                    defaultValue={formattedDateOfJoining}
                    placeholder="Enter joining Date"
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    invalid date of joining
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Col xs={5} className="my-2">
                <label htmlFor="employeeType">Employee Type:</label>
                <Form.Select
                  name="EmployeeType"
                  id="EmployeeType"
                  defaultValue={emp.EmployeeType}
                  disabled
                >
                  <option value="FullTime">FullTime</option>
                  <option value="PartTime">PartTime</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                  <Form.Control.Feedback type="invalid">
                    select employee type
                  </Form.Control.Feedback>
                </Form.Select>
              </Col>
              <Col xs={5} className="my-2">
                <label htmlFor="title">Title:</label>
                <Form.Select
                  id="title"
                  name="Title"
                  defaultValue={emp.Title}
                  onChange={this.handleInputChange}
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </Form.Select>
              </Col>
              <Col xs={5} className="my-2">
                <label htmlFor="department" defaultValue={emp.Department}>
                  Department:
                </label>
                <Form.Select
                  id="department"
                  name="Department"
                  onChange={this.handleInputChange}
                >
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </Form.Select>
              </Col>
              <Col>
                <p>Time left in retirement</p>
                <Row xs={6} className="justify-content-center">
                  <Col>
                    <p className="fw-bold my-0">YEARS</p>
                    <p>{year}</p>
                  </Col>
                  <Col>
                    <p className="fw-bold my-0">MONTHS</p>
                    <p>{month}</p>
                  </Col>
                  <Col>
                    <p className="fw-bold my-0">DAYS</p>
                    <p>{day}</p>
                  </Col>
                </Row>
              </Col>
              <Col xs={5}>
                <label htmlFor="currentStatus">Current Status:</label>
                <Form.Select
                  id="currentStatus"
                  defaultValue={emp.CurrentStatus}
                  onChange={this.handleInputChange}
                  name="CurrentStatus"
                >
                  <option value="1">Working</option>
                  <option value="0">Retired</option>
                </Form.Select>
              </Col>
              <span>
                <pre>{this.state.error}</pre>
              </span>
              <Button type="submit" variant="dark">
                Update Employee
              </Button>
            </Form>
            <Toast
              bg="info"
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
                <strong className="me-auto">Updated</strong>
              </Toast.Header>
              <Toast.Body>Employee updated successfully</Toast.Body>
            </Toast>
          </center>
        </Col>
      </Row>
    );
  }
}

export default EmployeeDetails;
