class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fetchQuery }),
      });

      if (response.ok) {
        const body = await response.json();
        console.log("Fetched employees:", body.data.getAllEmployees);
        this.setState({ employees: body.data.getAllEmployees });
      } else {
        console.error("GraphQL request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching employees:", error);
    }
  };
  createNewEmployee = async (emp) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutationQuery }),
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
      width: "50%",
    };

    return (
      <div>
        <fieldset style={fieldStyle}>
          <legend>
            <h2> EMPLOYEE MANAGMENT SYSTEM</h2>
          </legend>
          <EmployeeSearch />
          <EmployeeTable employees={this.state.employees} />
          <EmployeeCreate onNewEmployeeClick={this.createNewEmployee} />
        </fieldset>
      </div>
    );
  }
}
class EmployeeSearch extends React.Component {
  render() {
    const searchStyle = {
      width: "96%",
      padding: "0.5rem 10px",
    };

    return (
      <input
        style={searchStyle}
        type="text"
        name=""
        placeholder="Enter employee to search"
        id=""
      />
    );
  }
}

class EmployeeTable extends React.Component {
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
                <td style={cellStyle}>{emp.DateOfJoining}</td>
                <td style={cellStyle}>{emp.Title}</td>
                <td style={cellStyle}>{emp.Department}</td>
                <td style={cellStyle}>{emp.EmployeeType}</td>
                <td style={cellStyle}>{emp.CurrentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  addEmployeeHandler = (evt) => {
    evt.preventDefault();

    const formValues = {};
    new FormData(evt.target).forEach((value, key) => {
      // console.log(value, ":", key);
      formValues[key] = value.trim();
    });

    let error = "";

    if (formValues.firstName === "") error += "\n First name is required";
    if (formValues.lastName === "") error += "\n Last name is required";
    if (formValues.age > 70 || formValues.age < 20)
      error += "\n Age must be a number between 20 to 70";

    if (error.length > 0) {
      this.setState({ error: error });
    } else {
      this.props.onNewEmployeeClick(formValues);
    }
  };
  render() {
    const buttonStyle = {
      padding: "0.6rem 1rem",
      color: "fff",
      cursor: "pointer",
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
    return (
      <section>
        <h3>
          <u>
            <center>ADD EMPLOYEE</center>
          </u>
        </h3>
        <form onSubmit={this.addEmployeeHandler}>
          <div>
            <label style={labelStyle} htmlFor="firstName">
              First Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first Name"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="lastName">
              Last Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last Name"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="age">
              Age:
            </label>
            <input
              style={inputStyle}
              type="number"
              name="age"
              id="age"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="dateOfJoining">
              Date of joining:
            </label>
            <input
              style={inputStyle}
              type="date"
              name="dateOfJoining"
              id="dateOfJoining"
              placeholder="Enter date of joining"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="title">
              Title:
            </label>
            <select style={inputStyle} id="title" name="title">
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
            <select style={inputStyle} id="department" name="department">
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div>
            <label
              style={labelStyle}
              htmlFor="employeeType"
              name="employeeTyle"
            >
              Employee Type:
            </label>
            <select style={inputStyle} name="employeeType" id="employeeType">
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <span style={errorStyle}>
            <pre>{this.state.error}</pre>
          </span>
          <button type="submit" style={buttonStyle}>
            Add Employee
          </button>
        </form>
      </section>
    );
  }
}

ReactDOM.render(<EmployeeDirectory />, document.getElementById("contents"));
