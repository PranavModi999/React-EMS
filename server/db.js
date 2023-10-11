const { log } = require("console");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGO_URL =
  "mongodb+srv://pranavmodi767:Ashwin123@pranav.hoyptbk.mongodb.net/Employee?retryWrites=true&w=majority";
let db;

const dbConnect = async () => {
  if (!db) {
    const client = new MongoClient(MONGO_URL);
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
