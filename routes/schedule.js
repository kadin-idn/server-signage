const express = require("express");
const ControllerSchedule = require("../controllers/schedule");
const Schedule = express.Router();

Schedule.get("/", ControllerSchedule.getAllSchedule);
Schedule.post("/", ControllerSchedule.addSchedule);
Schedule.get("/:day", ControllerSchedule.getScheduleByDay);

module.exports = Schedule;
