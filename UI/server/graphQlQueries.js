function jsonDateReviver(key, value) {
  const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
const getEmployeeById = async (id) => {
  const fetchEmployeeQuery = `
    query GetAll($id:String){
      getEmployeeById(id:$id) {
        id
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
      body: JSON.stringify({
        query: fetchEmployeeQuery,
        variables: { id: id },
      }),
    });

    if (response.ok) {
      const body = JSON.parse(await response.text(), jsonDateReviver);
      console.log("single employees:", body.data);
      return body.data.getEmployeeById;
      //   this.setState({ employees: body.data.getAllEmployees });
    } else {
      console.error("GraphQL request failed with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred while fetching employees:", error);
  }
};

const fetchEmployeesByFilter = async (filterType) => {
  const fetchQuery = `
    query GetAll($filterType:String){
      getAllEmployees(filter:$filterType) {
        id
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
      body: JSON.stringify({
        query: fetchQuery,
        variables: { filterType: filterType },
      }),
    });

    if (response.ok) {
      const body = JSON.parse(await response.text(), jsonDateReviver);
      console.log("Fetched employees:", body.data.getAllEmployees);
      return body.data.getAllEmployees;
      //   this.setState({ employees: body.data.getAllEmployees });
    } else {
      console.error("GraphQL request failed with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred while fetching employees:", error);
  }
};

const createNewEmployee = async (emp) => {
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
      return true;
      //   this.fetchEmployees(this.state.employeeFilter);
    } else {
      return false;
      //   console.error("GraphQL request failed with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred while creating a new employee:", error);
  }
};

module.exports = { createNewEmployee, fetchEmployeesByFilter, getEmployeeById };
