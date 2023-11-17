/* eslint-disable no-param-reassign */
/* eslint no-restricted-globals: "off" */
const { getEmployeeDbInstance } = require("../db");

// genrate a random number to assign to a new employee document
function generateEmployeeID() {
  const min = 1000;
  const max = 9999;
  const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomID;
}

// fetch all employess document from database
// if no filter then return all document
// esle only return documents with matching id
const getAllEmployees = async (filter) => {
  const instance = await getEmployeeDbInstance();
  if (filter) return instance.find({ EmployeeType: filter }).toArray();
  return instance.find({}).toArray();
};

// get a single employee with matching id from database
const getEmployeeById = async (id) => {
  const instance = await getEmployeeDbInstance();

  const data = await instance.findOne({ id: parseInt(id, 10) });
  return data;
};

// delete a single employee with matching id from database
const deleteEmployeeById = async (id) => {
  const instance = await getEmployeeDbInstance();

  const data = await instance.deleteOne({ id: parseInt(id, 10) });
  return data;
};

// find and update employee document with matching id
const updateEmployeeById = async (emp) => {
  const instance = await getEmployeeDbInstance();
  emp.id = parseInt(emp.id, 10);
  const data = await instance.findOneAndUpdate(
    { id: parseInt(emp.id, 10) },
    { $set: emp },
  );
  return data;
};

// create a new employee based on emp object passed in argument
const createNewEmployee = async (emp) => {
  const instance = await getEmployeeDbInstance();
  emp.id = generateEmployeeID();
  await instance.insertOne(emp);
  return emp;
};

module.exports = {
  updateEmployeeById,
  deleteEmployeeById,
  createNewEmployee,
  getEmployeeById,
  getAllEmployees,
};
