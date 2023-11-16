/* eslint-disable consistent-return */
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

const createNewEmployee = async (emp) => {
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
      body: JSON.stringify({ query: mutationQuery, variables: { emp } }),
    });

    if (response.ok) {
      await response.json();
      alert("Employee added successfully!");
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const deleteEmployeeById = async (id) => {
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
      alert("Employee deleted successfully!");
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (emp) => {
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
