const { Room } = require("../models");

class ControllerRoom {
  static async getAllRoom(req, res) {
    try {
      const data = await Room.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerRoom;
