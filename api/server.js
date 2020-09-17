const express = require("express");
const db = require("../data/dbConfig.js");
const accountRoutes = require("../accounts/accountRoutes");
const server = express();

server.use(express.json());

server.use("/api/accounts", accountRoutes);

module.exports = server;
