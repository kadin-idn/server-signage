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
  static async createRoom(req, res) {
    try {
      const { name } = req.body;
      if (!name) throw { name: "NameCannotBeEmpty" };
      const data = await Room.create({ name });
      res.status(201).json({message: "Room created"});
    } catch (error) {
      console.log(error);
      if (error.name === "NameCannotBeEmpty") {
        res.status(400).json({ message: "Name cannot be empty" });
      } else {
      res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = ControllerRoom;
