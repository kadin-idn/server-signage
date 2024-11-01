const express = require("express");
const ControllerUser = require("../controllers/user");
const Authentication = require("../middlewares/authentication");
const { AuthSuperAdmin } = require("../middlewares/autthorization");
const User = express.Router();


User.get("/", ControllerUser.GetAllUser);
User.post("/", Authentication, AuthSuperAdmin, ControllerUser.AddUser);
User.delete("/:id", Authentication, AuthSuperAdmin, ControllerUser.DeleteUser);

module.exports = User;
