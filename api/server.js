const express = require("express");
const cors = require("cors");

const usersRouter = require("./users/users-router.js");

const server = express();


server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ message:`hello bubblegum`});
});

module.exports = server;