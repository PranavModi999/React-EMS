/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Col, Row, Table } from "react-bootstrap";

export default class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerList = [
      "FirstName",
      "LastName",
      "Age",
      "DateOfJoining",
      "Title",
      "Department",
      "EmployeeType",
      "CurrentStatus",
      "Actions",
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
              {this.props.employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.FirstName}</td>
                  <td>{emp.LastName}</td>
                  <td>{emp.Age}</td>
                  <td>{new Date(emp.DateOfJoining).toDateString()}</td>
                  <td>{emp.Title}</td>
                  <td>{emp.Department}</td>
                  <td>{emp.EmployeeType}</td>
                  <td>{emp.CurrentStatus}</td>
                  <td className="actions">
                    <a href={`/#/empEdit/${emp.id}`} className="icon m-1">
                      <img
                        src="/images/update.svg"
                        className="justify-content-center align-middle"
                        alt="update"
                      />
                      Update
                    </a>
                    <a
                      href="#"
                      onClick={() => this.props.onDeleteClick(emp.id)}
                      className="icon m-1"
                    >
                      <img src="/images/delete.svg" alt="delete" />
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}
