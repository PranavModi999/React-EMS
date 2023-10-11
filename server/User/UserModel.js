const { getEmployeeDbInstance } = require("../db");

const getAllEmployees = async () => {
  const instance = await getEmployeeDbInstance();
  return instance.find({}).toArray();
};
const createNewEmployee = async (emp) => {
  const instance = await getEmployeeDbInstance();
  const employee = await instance.insertOne(emp);
  return emp;
};

module.exports = {
  createNewEmployee,
  getAllEmployees,
};
