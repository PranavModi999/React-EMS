/* eslint-disable linebreak-style */
/* eslint no-restricted-globals: "off" */

const { MongoClient } = require("mongodb");

let db;

// if db instance is null create an new dbinstance
const dbConnect = async () => {
  if (!db) {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db();
  }
  // eslint-disable-next-line no-console
  console.log("Successfully connected to database!");
};

// bind global db instance to employees collection
const getEmployeeDbInstance = async () => {
  if (!db) await dbConnect();
  return db.collection("employees");
};

module.exports = {
  getEmployeeDbInstance,
  dbConnect,
};
