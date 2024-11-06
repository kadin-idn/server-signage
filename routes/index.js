const express = require("express");
const HeroBanner = require("./heroBanner");
const User = require("./user");
const Schedule = require("./schedule");
const Role = require("./role");
const Room = require("./room");
const ControllerUser = require("../controllers/user");
const Authentication = require("../middlewares/authentication");
const File = require("./file");
const { emitReload, emitSchedule, emitBanner } = require("../config/socket-io");
const { Authorization } = require("../middlewares/autthorization");
const router = express.Router();

router.post("/login", ControllerUser.Login);
router.get("/trigger-reload", Authentication, Authorization, async (req, res) => {
    console.log("API /trigger-reload hit");
    emitSchedule()
    emitBanner()
    res.send("Reload event triggered");
  });

router.use("/heroBanner", HeroBanner);
router.use("/user", User);
router.use("/schedule", Schedule);
router.use("/role", Role);
router.use("/room", Room);
router.use("/file", File);

module.exports = router;
