/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint no-restricted-globals: "off" */

const express = require("express");

// config enviormental variables
require("dotenv").config();

const { installHandler, server } = require("./apiHandler");
const database = require("./db");

const app = express();

// start apollo server instance passed by apiHandler
async function startServer() {
  await server.start();

  installHandler(app);

  // connect to mongodb
  await database.dbConnect();

  // eslint-disable-next-line no-console
  app.listen(process.env.PORT, () =>
    // eslint-disable-next-line implicit-arrow-linebreak, no-console
    console.log(`Server started listening on port ${process.env.PORT}...`));
}

// start api server
startServer();
