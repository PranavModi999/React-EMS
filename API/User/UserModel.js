/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint no-restricted-globals: "off" */

const { getEmployeeDbInstance } = require("../db");

function generateEmployeeID() {
  const min = 1000;
  const max = 9999;
  const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomID;
}

const getAllEmployees = async (filter) => {
  const instance = await getEmployeeDbInstance();
  if (filter) return instance.find({ EmployeeType: filter }).toArray();
  return instance.find({}).toArray();
};
const getEmployeeById = async (id) => {
  const instance = await getEmployeeDbInstance();

  const data = await instance.findOne({ id: parseInt(id, 10) });
  return data;
};

const createNewEmployee = async (emp) => {
  const instance = await getEmployeeDbInstance();
  emp.id = generateEmployeeID();
  await instance.insertOne(emp);
  return emp;
};

module.exports = {
  getEmployeeById,
  createNewEmployee,
  getAllEmployees,
};
