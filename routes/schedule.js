const express = require("express");
const ControllerSchedule = require("../controllers/schedule");
const Authentication = require("../middlewares/authentication");
const { Authorization } = require("../middlewares/autthorization");
const Schedule = express.Router();

Schedule.get("/", ControllerSchedule.getAllSchedule);
Schedule.post(
  "/",
  Authentication,
  Authorization,
  ControllerSchedule.addSchedule
);
Schedule.get("/:day", ControllerSchedule.getScheduleByDay);

module.exports = Schedule;
