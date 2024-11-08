const { File } = require("../models");

class ControllerFile {
  static async getFileById(req, res) {
    try {
      const { id } = req.params;
      
      const file = await File.findByPk(id);
      if (!file) throw { name: "DataNotFound" };

      res.status(200).type(file.fileType).send(Buffer.from(file.data));
    } catch (error) {
      console.log(error);
      if (error.name === "DataNotFound") {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = ControllerFile;
