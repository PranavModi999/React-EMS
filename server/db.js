const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

let db;

const dbConnect = async () => {
  if (!db) {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db();
  }
  console.log("Successfully connected to database!");
};

const getEmployeeDbInstance = async () => {
  if (!db) await dbConnect();
  return db.collection("employees");
};

module.exports = {
  getEmployeeDbInstance,
  dbConnect,
};
