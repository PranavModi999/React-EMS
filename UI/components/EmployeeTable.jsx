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

    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse",
    };
    const cellStyle = {
      border: "1px solid black",
      padding: "8px",
    };
    return (
      <section>
        <table style={tableStyle}>
          <caption>
            <h3>
              <u>EMPLOYEE LIST</u>
            </h3>
          </caption>
          <thead>
            <tr>
              {headerList.map((header, index) => (
                <th key={index} style={cellStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map((emp, index) => (
              <tr key={index}>
                <td style={cellStyle}>{emp.FirstName}</td>
                <td style={cellStyle}>{emp.LastName}</td>
                <td style={cellStyle}>{emp.Age}</td>
                <td style={cellStyle}>{emp.DateOfJoining.toDateString()}</td>
                <td style={cellStyle}>{emp.Title}</td>
                <td style={cellStyle}>{emp.Department}</td>
                <td style={cellStyle}>{emp.EmployeeType}</td>
                <td style={cellStyle}>{emp.CurrentStatus}</td>
                <td style={cellStyle}>
                  <a href={`/#/empEdit/${emp.id}`}>Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
