const express = require("express");
const HeroBanner = require("./heroBanner");
const User = require("./user");
const Schedule = require("./schedule");
const Role = require("./role");
const Room = require("./room");
const ControllerUser = require("../controllers/user");
const Authentication = require("../middlewares/authentication");
const {
  Authorization,
  AuthSuperAdmin,
} = require("../middlewares/autthorization");
const router = express.Router();

router.post("/login", ControllerUser.Login);

router.use("/heroBanner", Authentication, Authorization, HeroBanner);
router.use("/user", Authentication, AuthSuperAdmin, User);
router.use("/schedule", Authentication, Authorization, Schedule);
router.use("/role", Authentication, Role);
router.use("/room", Authentication, Room);

module.exports = router;
