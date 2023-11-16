import React from "react";

export default class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.employeeTypeChangeHandler = this.employeeTypeChangeHandler.bind(this);
  }
  employeeTypeChangeHandler(evt) {
    this.props.onFilterChange(evt.target.value);
  }
  render() {
    const searchStyle = {
      width: "96%",
      padding: "0.5rem 10px",
    };
    const labelStyle = {
      display: "inline-block",
      fontSize: "1.2rem",
      margin: "12px",
    };

    return (
      <React.Fragment>
        <label style={labelStyle} htmlFor="employeeType">
          Filter By Employee Type:
        </label>
        <select
          style={searchStyle}
          onChange={this.employeeTypeChangeHandler}
          name="EmployeeType"
          id="EmployeeType"
        >
          <option value="">All Employees</option>
          <option value="FullTime">FullTime</option>
          <option value="PartTime">PartTime</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </React.Fragment>
    );
  }
}
