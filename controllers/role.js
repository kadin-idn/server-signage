const { Role } = require("../models");

class ControllerRole {
  static async getAllRole(req, res) {
    try {
      const role = await Role.findAll({attributes: { exclude: ["createdAt", "updatedAt"] }});
      res.status(200).json(role);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ControllerRole;
