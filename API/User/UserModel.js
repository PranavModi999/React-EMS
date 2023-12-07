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

const getEmployeeById = async (id) => {
  const instance = await getEmployeeDbInstance();

  const data = await instance.findOne({ id: parseInt(id, 10) });

  if (data && data.DOB) {
    // Assuming DOB is the person's date of birth
    const DOB = new Date(data.DOB);
    const currentDate = new Date();

    // Calculate the age in years
    const ageInYears = currentDate.getFullYear() - DOB.getFullYear();

    // Calculate the date when the person will turn 65
    const turning65Date = new Date(DOB);
    turning65Date.setFullYear(DOB.getFullYear() + 65);

    // Calculate the remaining days until turning 65
    const remainingDaysUntil65 = Math.ceil((turning65Date - currentDate) / (1000 * 60 * 60 * 24));

    // Calculate days, months, and years left
    const yearsLeft = Math.floor(remainingDaysUntil65 / 365);
    const monthsLeft = Math.floor((remainingDaysUntil65 % 365) / 30);
    const days = Math.floor((remainingDaysUntil65 % 365) % 30);

    // Add retirement details to the data object
    data.RetirementTime = {
      days: days,
      months: monthsLeft,
      years: yearsLeft,
    };

    console.log(data);
  }

  return data;
};


// delete a single employee with matching id from database
const deleteEmployeeById = async (id) => {
  const instance = await getEmployeeDbInstance();
  const employee = await instance.findOne({ id: parseInt(id, 10) });

  // Check if the employee exists and has CurrentStatus "1"
  if (employee && employee.CurrentStatus === "1") {
    // Return something when the condition is met
    console.log("status active");
    return { success: false, message: "CAN’T DELETE EMPLOYEE – STATUS ACTIVE" };
  }

  // If the employee exists and the CurrentStatus is not "1," proceed with deletion
  console.log("not active");
  const data = await instance.deleteOne({ id: parseInt(id, 10) });
  
  return { success: true, message: "Employee deleted." };
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
  console.log(emp);
  return emp;
};

const getRetirementData = async () => {
  const document = await getEmployeeDbInstance();
  const retirementAge = 65;

  // Calculate the date 6 months from now
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  // Calculate the date of birth 65 years ago
  const retirementDOB = new Date();
  retirementDOB.setFullYear(retirementDOB.getFullYear() - retirementAge);

  // Calculate the date of birth 65 years and 6 months ago
  const retirementDOBPlusSixMonths = new Date(retirementDOB);
  retirementDOBPlusSixMonths.setMonth(retirementDOBPlusSixMonths.getMonth() + 6);

  // Filter employees based on DOB
  console.log(retirementAge);
  console.log(retirementDOB,retirementDOBPlusSixMonths);
  const retirementData = await document
    .find({
      DOB: {
        $lte: retirementDOBPlusSixMonths, // DOB is on or before 65 years and 6 months ago
        $gte: retirementDOB,               // DOB is 65 years ago or more
      },
    })
    .toArray();

  if (retirementData.length === 0) {
    console.log(`No employees found who will be ${retirementAge} in the next 6 months.`);
  }

  console.log(`Employees who will be ${retirementAge} in the next 6 months:`, retirementData);

  return retirementData;
};


module.exports = {
  updateEmployeeById,
  deleteEmployeeById,
  createNewEmployee,
  getEmployeeById,
  getAllEmployees,
  getRetirementData
};
