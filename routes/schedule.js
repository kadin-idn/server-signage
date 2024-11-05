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
Schedule.patch(
  "/:id",
  Authentication,
  Authorization,
  ControllerSchedule.updateScheduleById
);
Schedule.get("/:id", Authentication,Authorization,ControllerSchedule.getScheduleById);
Schedule.delete(
  "/:id",
  Authentication,
  Authorization,
  ControllerSchedule.deleteScheduleById
);

module.exports = Schedule;
