/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from "react";

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
      <section className="employee-table-container">
        <table className="employee-table">
          <caption>
            <h3>
              <u>EMPLOYEE LIST</u>
            </h3>
          </caption>
          <thead>
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
                <td>{emp.DateOfJoining.toDateString()}</td>
                <td>{emp.Title}</td>
                <td>{emp.Department}</td>
                <td>{emp.EmployeeType}</td>
                <td>{emp.CurrentStatus}</td>
                <td className="actions">
                  <a href={`/#/empEdit/${emp.id}`} className="icon">
                    <img src="/images/update.svg" alt="update" />
                    update
                  </a>
                  <a
                    href="#"
                    onClick={() => this.props.onDeleteClick(emp.id)}
                    className="icon"
                  >
                    <img src="/images/delete.svg" alt="delete" />
                    delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
