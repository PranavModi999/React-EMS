import React from "react";
import GraphQlQueries from "../server/graphQlQueries.js";
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
      <section className="employee-table-container">
        <table className="employee-table">
          <caption>
            <h3>
              <u>EMPLOYEE LIST</u>
            </h3>
          </caption>
          <thead>
            <tr>
              {/* creater table header based on headerList dynamically */}
              {headerList.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* display data based on employee object of list passed by parent in
                prop */}
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
        </table>
      </section>
    );
  }
}
