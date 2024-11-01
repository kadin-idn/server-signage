const { Schedule, Room } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class ControllerSchedule {
  static async getAllSchedule(req, res) {
    try {
      console.log("ini schedule");
      
      const { filterDay, filterRoomId } = req.query;
      const startOfDay = moment(filterDay).startOf("day").toDate(); // Awal hari
      const endOfDay = moment(filterDay).endOf("day").toDate(); // Akhir hari
      let paramsquery = {
        include: {
          model: Room,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "RoomId"],
        },
      };
      if (filterDay && filterRoomId) {
        paramsquery.where = {
          [Op.and]: [
            {
              day: {
                [Op.gte]: startOfDay, // Mencari entri yang lebih besar atau sama dengan awal hari
              },
            },
            {
              day: {
                [Op.lt]: endOfDay, // Mencari entri yang kurang dari akhir hari
              },
            },
            {
              RoomId: filterRoomId,
            },
          ],
        };
      } else if (filterDay) {
        paramsquery.where = {
          day: {
            [Op.gte]: startOfDay,
            [Op.lt]: endOfDay,
          },
        };
      } else if (filterRoomId) {
        paramsquery.where = { RoomId: filterRoomId };
      }

      const schedule = await Schedule.findAll(paramsquery);
      res.status(200).json(schedule);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async addSchedule(req, res) {
    try {
      const { id } = req.user;
      const { name, day, startTime, endTime, RoomId } = req.body;

      const findRoom = await Room.findByPk(RoomId);
      if (!findRoom) throw { name: "RoomNotFound" };

      const findSchedule = await Schedule.findOne({ where: { day, RoomId } });
      if (findSchedule) {
        const findScheduleByTime = await Schedule.findOne({
          where: { startTime, endTime },
        });

        if (findScheduleByTime)
          throw { name: "TheTimeSlotIsAlreadyBookedForAnotherEvent." };
        throw { name: "ThisRoomAlreadyHasAnEventScheduled" };
      }

      const schedule = await Schedule.create({
        name,
        day,
        startTime,
        endTime,
        RoomId,
        UpdatedBy: id,
        CreatedBy: id,
      });
      const dateOnly = moment(schedule.day).format("MMM Do YY");
      res.status(201).json({
        message: `The schedule for ${dateOnly}, has been successfully created.`,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "ThisRoomAlreadyHasAnEventScheduled") {
        res
          .status(400)
          .json({ message: "This room already has an event scheduled" });
      } else if (error.name === "TheTimeSlotIsAlreadyBookedForAnotherEvent.") {
        res.status(400).json({
          message: "The time slot is already booked for another event",
        });
      } else if (error.name === "RoomNotFound") {
        res.status(400).json({ message: "Room not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async getScheduleByDay(req, res) {
    try {
      const { day } = req.params;
      const startOfDay = moment(day).startOf("day").toDate(); // Awal hari
      const endOfDay = moment(day).endOf("day").toDate(); // Akhir hari
      const schedule = await Schedule.findAll({
        where: {
          [Op.and]: [
            {
              day: {
                [Op.gte]: startOfDay, // Mencari entri yang lebih besar atau sama dengan awal hari
              },
            },
            {
              day: {
                [Op.lt]: endOfDay, // Mencari entri yang kurang dari akhir hari
              },
            }
          ],
        },
        order: [["startTime", "ASC"]],
      });
      res.status(200).json(schedule);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ControllerSchedule;
