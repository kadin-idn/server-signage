const { HeroBanner, File } = require("../models");
class ControllerHeroBanner {
  static async createHeroBanner(req, res) {
    try {
      const { title, description } = req.body;
      if (!req.files) throw { name: "FileIsEmpty" };
      const file = req.files.fileHero;
      console.log(file);

      if (!file) throw { name: "FileIsEmpty" };

      const filename = file.name;

      const moveFile = (file, path) => {
        return new Promise((resolve, reject) => {
          file.mv(path, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      };

      await Promise.all([
        moveFile(file, __dirname + ".." + "/uploads/" + filename),
      ]);
      res.send("Files Uploaded");
    } catch (error) {
      console.log(error);
      if (error.name === "FileIsEmpty") {
        res.status(400).json({ message: "File is empty" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = ControllerHeroBanner;
