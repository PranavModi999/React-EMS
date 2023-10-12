class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }
  addEmployeeHandler = evt => {
    evt.preventDefault();
    const formValues = {};
    new FormData(evt.target).forEach((value, key) => {
      // console.log(value, ":", key);
      if (key == "Age") formValues[key] = parseInt(value);else formValues[key] = value.trim();
    });
    formValues["CurrentStatus"] = "1";
    let error = "";
    if (formValues.firstName === "") error += "\n First name is required";
    if (formValues.lastName === "") error += "\n Last name is required";
    if (formValues.age > 70 || formValues.age < 20) error += "\n Age must be a number between 20 to 70";
    if (error.length > 0) {
      this.setState({
        error: error
      });
    } else {
      this.props.onNewEmployeeClick(formValues);
    }
  };
  render() {
    const buttonStyle = {
      padding: "0.6rem 1rem",
      color: "fff",
      cursor: "pointer"
    };
    const labelStyle = {
      display: "inline-block",
      width: "15%"
    };
    const inputStyle = {
      width: "40%",
      padding: "4px",
      margin: "10px"
    };
    const errorStyle = {
      margin: "1rem",
      display: "block",
      color: "red"
    };
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("u", null, /*#__PURE__*/React.createElement("center", null, "ADD EMPLOYEE"))), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.addEmployeeHandler
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "firstName"
    }, "First Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "FirstName",
      id: "firstName",
      placeholder: "Enter first Name"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "lastName"
    }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "LastName",
      id: "lastName",
      placeholder: "Enter last Name"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "age"
    }, "Age:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "number",
      name: "Age",
      id: "age",
      placeholder: "Enter age"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "dateOfJoining"
    }, "Date of joining:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "date",
      name: "DateOfJoining",
      id: "dateOfJoining",
      placeholder: "Enter date of joining"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "title"
    }, "Title:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      id: "title",
      name: "Title"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "department"
    }, "Department:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      id: "department",
      name: "Department"
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "employeeType"
    }, "Employee Type:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      name: "EmployeeType",
      id: "EmployeeType"
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal"))), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, /*#__PURE__*/React.createElement("pre", null, this.state.error)), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: buttonStyle
    }, "Add Employee")));
  }
}