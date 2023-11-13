/* eslint "react/react-in-jsx-scope": "off" */
/* eslint-disable arrow-body-style */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

// eslint-disable-next-line react/prefer-stateless-function
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

  jsonDateReviver(key, value) {
    const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
    if (dateRegex.test(value)) return new Date(value);
    return value;
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
      const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fetchQuery }),
      });

      if (response.ok) {
        const body = JSON.parse(await response.text(), this.jsonDateReviver);
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
    console.log("emp:", emp);
    const mutationQuery = `
    mutation CreateNew($emp:EmployeeInput!){
      createNewEmployee(emp:$emp) {
        FirstName
      }
    }
  `;
    try {
      const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutationQuery, variables: { emp: emp } }),
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

ReactDOM.render(<EmployeeDirectory />, document.getElementById("contents"));