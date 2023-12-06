/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from "react";

import GraphQLQueries from "../server/graphQlQueries";

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emp: null,
    };
    // bind functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateEmployeeHandler = this.updateEmployeeHandler.bind(this);
  }

  async componentDidMount() {
    // get id route parameter
    const { id } = this.props.match.params;

    try {
      // returns employee with matching id from database
      const data = await GraphQLQueries.getEmployeeById(id);
      console.log(data);
      // update state
      this.setState({ emp: data });
    } catch (error) {
      throw error;
    }
  }

  async updateEmployeeHandler(event) {
    event.preventDefault();
    try {
      // updates employee from database
      await GraphQLQueries.updateEmployee(this.state.emp);
      alert("Employee updated Successfully");
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
    const buttonStyle = {
      padding: "0.6rem 1rem",
      color: "fff",
      cursor: "pointer",
      margin: "12px",
    };
    const labelStyle = {
      display: "inline-block",
      width: "15%",
    };
    const inputStyle = {
      width: "40%",
      padding: "4px",
      margin: "10px",
    };
    const errorStyle = {
      margin: "1rem",
      display: "block",
      color: "red",
    };
    if (!this.state.emp) {
      return <div>Loading...</div>;
    }
    const formattedDateOfJoining = new Date(emp.DateOfJoining)
      .toISOString()
      .split("T")[0];
      const formattedDateOfBirth = new Date(emp.DOB).toISOString().split("T")[0] ;

      return (
      <section className="create-form">
        <center>
          <h3>
            <u>EMPLOYEE DETAILS</u>
          </h3>
          <form onSubmit={this.updateEmployeeHandler}>
            <div>
              <label style={labelStyle} htmlFor="firstName">
                First Name:
              </label>
              <input
                style={inputStyle}
                type="text"
                name="FirstName"
                id="firstName"
                value={emp.FirstName}
                placeholder="Enter first Name"
                disabled
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="lastName">
                Last Name:
              </label>
              <input
                style={inputStyle}
                type="text"
                name="LastName"
                id="lastName"
                value={emp.LastName}
                placeholder="Enter last Name"
                disabled
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="age">
                Age:
              </label>
              <input
                style={inputStyle}
                type="number"
                name="Age"
                id="age"
                value={emp.Age}
                placeholder="Enter age"
                disabled
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="dateOfJoining">
                Date of joining:
              </label>
              <input
                style={inputStyle}
                type="date"
                name="DateOfJoining"
                value={formattedDateOfJoining}
                id="dateOfJoining"
                placeholder="Enter date of joining"
                disabled
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="DOB">
                Date of Birth:
              </label>
              <input
                style={inputStyle}
                type="date"
                name="DOB"
                value={formattedDateOfBirth}
                id="DOB"
                placeholder="Enter date of Birth"
                disabled
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="employeeType">
                Employee Type:
              </label>
              <select
                style={inputStyle}
                name="EmployeeType"
                value={emp.EmployeeType}
                id="EmployeeType"
                disabled
              >
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="title">
                Title:
              </label>
              <select
                style={inputStyle}
                id="title"
                value={emp.Title}
                onChange={this.handleInputChange}
                name="Title"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="department">
                Department:
              </label>
              <select
                style={inputStyle}
                id="department"
                onChange={this.handleInputChange}
                value={emp.Department}
                name="Department"
              >
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="currentStatus">
                Current Status:
              </label>
              <select
                style={inputStyle}
                id="currentStatus"
                value={emp.CurrentStatus}
                onChange={this.handleInputChange}
                name="CurrentStatus"
              >
                <option value="1">Working</option>
                <option value="0">Retired</option>
              </select>
            </div>
            <span style={errorStyle}>
              <pre>{this.state.error}</pre>
            </span>
            <button type="submit" style={buttonStyle}>
              Update Employee
            </button>
          </form>
        </center>
      </section>
    );
  }
}

export default EmployeeDetails;
