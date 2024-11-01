const express = require("express");
const HeroBanner = require("./heroBanner");
const User = require("./user");
const Schedule = require("./schedule");
const Role = require("./role");
const Room = require("./room");
const ControllerUser = require("../controllers/user");
const Authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", ControllerUser.Login);

router.use("/heroBanner", HeroBanner);
router.use("/user", User);
router.use("/schedule", Schedule);
router.use("/role", Role);
router.use("/room", Room);

module.exports = router;
