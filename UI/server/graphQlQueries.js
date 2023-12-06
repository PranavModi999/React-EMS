/* eslint-disable consistent-return */

// helper function to retrive date from a json date property
function jsonDateReviver(key, value) {
  const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

// function returning employee with matching id in db
const getEmployeeById = async (id) => {
  // passing id as a query parameter
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
    // fetch call to graphql api to get back employee object with id
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: fetchEmployeeQuery,
        variables: { id },
      }),
    });

    if (response.ok) {
      const body = JSON.parse(await response.text(), jsonDateReviver);
      return body.data.getEmployeeById;
    }
  } catch (error) {
    throw error;
  }
};

// helper function to get employee list by filter
const fetchEmployeesByFilter = async (filterType) => {
  // if no filter then returns all employess or returns only employees with
  // matching employee type
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
    // call to graphql api to get employee list
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: fetchQuery,
        variables: { filterType },
      }),
    });

    if (response.ok) {
      const body = JSON.parse(await response.text(), jsonDateReviver);
      return body.data.getAllEmployees;
    }
  } catch (error) {
    throw error;
  }
};

// creates a new employee in database
const createNewEmployee = async (emp) => {
  // passing a emp object to be added in mutation of type EmployeeInput
  const mutationQuery = `
    mutation CreateNew($emp:EmployeeInput!){
      createNewEmployee(emp:$emp) {
        FirstName
      }
    }
  `;
  try {
    // call to graphql api to create a new employee
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutationQuery, variables: { emp } }),
    });

    if (response.ok) {
      await response.json();
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

// function to delete employee in database
const deleteEmployeeById = async (id) => {
  // mutation that taked id as query parameter and deletes matching employee
  const deleteByIdQuery = `
    mutation CreateNew($id: String!){
      deleteEmployeeById(id:$id)
    }
  `;
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: deleteByIdQuery, variables: { id } }),
    });

    if (response.ok) {
      await response.json();
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

// function to update employee in database
const updateEmployee = async (emp) => {
  // takes a new emp object and find employee with matching id in db
  // if found overwrites old emp object with new
  const updateQuery = `
    mutation update($emp: EmployeeInput!){
      updateEmployeeById(emp:$emp){
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
      body: JSON.stringify({ query: updateQuery, variables: { emp } }),
    });

    if (response.ok) {
      await response.json();
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchEmployeesByFilter,
  deleteEmployeeById,
  createNewEmployee,
  getEmployeeById,
  updateEmployee,
};
