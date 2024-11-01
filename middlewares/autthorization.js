const { User, Role } = require("../models");
const Authorization = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const verifyUser = await User.findByPk(id);
    if (!verifyUser) throw { name: "Unauthorized" };
    
    if (role === "admin" || role === "superAdmin") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "Unauthorized") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
const AuthSuperAdmin = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const verifyUser = await User.findByPk(id);
    if (!verifyUser) throw { name: "Unauthorized" };
    
    const findRole = await Role.findByPk(role);
    if (findRole.name === "superAdmin") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "Unauthorized") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
module.exports = {Authorization, AuthSuperAdmin};
