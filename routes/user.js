const express = require('express');
const ControllerUser = require('../controllers/user');
const User = express.Router()

User.get("/", (req, res) => {
  res.send("User Route")
})
User.post("/", ControllerUser.AddUser);
User.delete("/:id", ControllerUser.DeleteUser);



module.exports = User