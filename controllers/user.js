const { User, Role } = require("../models");
const { generateToken } = require("../helpers/jwt");

class ControllerUser {
  static async AddUser(req, res) {
    try {
      const { name, email, RoleId } = req.body;
      if (!name || !email) throw { name: "Email/NameIsRequired" };
      
      const findRole = await Role.findByPk(RoleId);
      if (!findRole) throw { name: "RoleNotFound" };

      const findUser = await User.findOne({ where: { email } });
      if (findUser) throw { name: "EmailAlreadyExist" };
      
      const user = await User.create({ email, name, RoleId });
      res.status(201).json({ message: `User ${user.name} has been created` });
    } catch (error) {
      console.log(error);
      if (error.name === "Email/NameIsRequired") {
        res.status(400).json({ message: "Email/Name is required" });
      } else if (error.name === "EmailAlreadyExist") {
        res.status(400).json({ message: "Email Already Exist" });
      } else if(error.name === "RoleNotFound") {
        res.status(400).json({ message: "Role not found" });
      }else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async DeleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "UserNotFound" };
      }
      await user.destroy();
      res.status(200).json({ message: `User ${user.name} has been deleted` });
    } catch (error) {
      if (error.name === "UserNotFound") {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async Login(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: { email },
        include: [{ model: Role }]
      });
      if (!user) {
        throw { name: "UserNotFound" };
      }
      const access_token = generateToken(user, user.Role.name);
      res.status(200).json(access_token);
    } catch (error) {
      if (error.name === "UserNotFound") {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = ControllerUser;
