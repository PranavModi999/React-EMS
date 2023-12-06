/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.employeeTypeChangeHandler = this.employeeTypeChangeHandler.bind(this);
  }

  // invoke parent method to handle filter change
  employeeTypeChangeHandler(evt) {
    this.props.onFilterChange(evt.target.value);
  }

  render() {
    return (
      <Row className="text-center justify-content-center">
        <Col xs={8}>
          <Form.Label htmlFor="employeeType">
            Filter By Employee Type:
          </Form.Label>
          <Form.Select
            className="my-2"
            onChange={this.employeeTypeChangeHandler}
            name="EmployeeType"
            id="EmployeeType"
          >

            <option value="">All Employees</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Form.Select>
        </Col>
      </Row>
    );
  }
}
