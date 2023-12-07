import React from "react";
import GraphQlQueries from "../server/graphQlQueries.js";
import { Col, Row, Table } from "react-bootstrap";

export default class Retirement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.getRetired = this.getRetired.bind(this);
  }

  async componentDidMount() {
    this.getRetired();
  }

  async getRetired() {
    console.log("get retired data");
    this.setState({
      employees: await GraphQlQueries.getRetirementData(),
    });
  }

  render() {
    const employeeList = this.state.employees;

    // Check if the employeeList is empty or null
    if (!employeeList || employeeList.length === 0) {
      return (
        <section className="employee-table-container">
          No employee data available.
        </section>
      );
    }

    const headerList = [
      "FirstName",
      "LastName",
      "Age",
      "DateOfJoining",
      "Title",
      "Department",
      "EmployeeType",
      "CurrentStatus",
    
    ];

    return (
      <Row className="justify-content-center align-middle">
        <Col xs={10}>
          <Table className="employee-table text-center align-middle" hover>
            <thead className="employee-table-header text-uppercase">
              <tr>
                {headerList.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeList.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.FirstName}</td>
                  <td>{emp.LastName}</td>
                  <td>{emp.Age}</td>
                  <td>{new Date(emp.DateOfJoining).toDateString()}</td>
                  <td>{emp.Title}</td>
                  <td>{emp.Department}</td>
                  <td>{emp.EmployeeType}</td>
                  <td>{emp.CurrentStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}
