class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }
  async componentDidMount() {
    await this.fetchEmployees();
  }
  fetchEmployees = async () => {
    console.log("fetch called");
    const fetchQuery = `
    query GetAll {
      getAllEmployees {
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: fetchQuery
        })
      });
      if (response.ok) {
        const body = await response.json();
        console.log("Fetched employees:", body.data.getAllEmployees);
        this.setState({
          employees: body.data.getAllEmployees
        });
      } else {
        console.error("GraphQL request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching employees:", error);
    }
  };
  createNewEmployee = async emp => {
    const mutationQuery = `
    mutation CreateNew {
      createNewEmployee(emp: {
        FirstName: "${emp.firstName}",
        LastName: "${emp.lastName}",
        Age: ${parseInt(emp.age)},
        DateOfJoining: "${emp.dateOfJoining}",
        Title: "${emp.title}",
        Department: "${emp.department}",
        EmployeeType: "${emp.employeeType}",
        CurrentStatus: "1"
      }) {
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: mutationQuery
        })
      });
      if (response.ok) {
        const body = await response.json();
        console.log("Created employee:", body.data.createNewEmployee);
        alert("Employee added successfully!");
        this.fetchEmployees();
      } else {
        console.error("GraphQL request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while creating a new employee:", error);
    }
  };
  render() {
    const fieldStyle = {
      border: "1px solid black",
      padding: "1rem 4rem",
      margin: "2% auto",
      textAlign: "center",
      width: "50%"
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("fieldset", {
      style: fieldStyle
    }, /*#__PURE__*/React.createElement("legend", null, /*#__PURE__*/React.createElement("h2", null, " EMPLOYEE MANAGMENT SYSTEM")), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      onNewEmployeeClick: this.createNewEmployee
    })));
  }
}
class EmployeeSearch extends React.Component {
  render() {
    const searchStyle = {
      width: "96%",
      padding: "0.5rem 10px"
    };
    return /*#__PURE__*/React.createElement("input", {
      style: searchStyle,
      type: "text",
      name: "",
      placeholder: "Enter employee to search",
      id: ""
    });
  }
}
class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const headerList = ["FirstName", "LastName", "Age", "DateOfJoining", "Title", "Department", "EmployeeType", "CurrentStatus"];
    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse"
    };
    const cellStyle = {
      border: "1px solid black",
      padding: "8px"
    };
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("table", {
      style: tableStyle
    }, /*#__PURE__*/React.createElement("caption", null, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("u", null, "EMPLOYEE LIST"))), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headerList.map((header, index) => /*#__PURE__*/React.createElement("th", {
      key: index,
      style: cellStyle
    }, header)))), /*#__PURE__*/React.createElement("tbody", null, this.props.employees.map((emp, index) => /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.FirstName), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.LastName), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.Age), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.DateOfJoining), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.Title), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.Department), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.EmployeeType), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.CurrentStatus))))));
  }
}
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
      formValues[key] = value.trim();
    });
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
      name: "firstName",
      id: "firstName",
      placeholder: "Enter first Name"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "lastName"
    }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "lastName",
      id: "lastName",
      placeholder: "Enter last Name"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "age"
    }, "Age:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "number",
      name: "age",
      id: "age",
      placeholder: "Enter age"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "dateOfJoining"
    }, "Date of joining:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "date",
      name: "dateOfJoining",
      id: "dateOfJoining",
      placeholder: "Enter date of joining"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "title"
    }, "Title:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      id: "title",
      name: "title"
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
      name: "department"
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
      htmlFor: "employeeType",
      name: "employeeTyle"
    }, "Employee Type:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      name: "employeeType",
      id: "employeeType"
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
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById("contents"));