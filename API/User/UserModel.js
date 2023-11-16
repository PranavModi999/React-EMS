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
  console.log(typeof id);
  const instance = await getEmployeeDbInstance();

  const data = await instance.findOne({ id: parseInt(id, 10) });
  return data;
};

const deleteEmployeeById = async (id) => {
  const instance = await getEmployeeDbInstance();

  const data = await instance.deleteOne({ id: parseInt(id, 10) });
  return data;
};

const updateEmployeeById = async (emp) => {
  const instance = await getEmployeeDbInstance();
  emp.id = parseInt(emp.id, 10);
  const data = await instance.findOneAndUpdate(
    { id: parseInt(emp.id, 10) },
    { $set: emp },
  );
  return data;
};

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
