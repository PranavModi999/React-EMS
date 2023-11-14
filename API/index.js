/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint no-restricted-globals: "off" */
const express = require("express");

require("dotenv").config();

const { installHandler, server } = require("./apiHandler");
const database = require("./db");

const app = express();

async function startServer() {
  await server.start();

  installHandler(app);

  await database.dbConnect();

  // eslint-disable-next-line no-console
  app.listen(process.env.PORT, () => console.log(`Server started listening on port ${process.env.PORT}...`));
}

startServer();
