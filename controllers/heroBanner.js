const { HeroBanner, File } = require("../models");
const { Op } = require("sequelize");
class ControllerHeroBanner {
  static async createHeroBanner(req, res) {
    try {
      const { title, description, startTime, endTime } = req.body;
      if (!req.files) throw { name: "FileIsEmpty" };
      const file = req.files.fileHero;
      if (!file) throw { name: "FileIsEmpty" };
      const newFile = await File.create({
        fileName: file.name,
        fileType: file.mimetype,
        data: file.data,
      });
      await HeroBanner.create({
        title,
        description,
        startTime,
        endTime,
        fileHero: newFile.id,
      });

      res.status(201).json({ message: "Hero Banner created" });
    } catch (error) {
      console.log(error);
      if (error.name === "FileIsEmpty") {
        res.status(400).json({ message: "File is empty" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async getAllHeroBanner(req, res) {
    try {
      const heroBanner = await HeroBanner.findAll({
        attributes:{exclude : ["createdAt", "updatedAt"]}
      });
      res.status(200).json(heroBanner);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteHeroBanner(req, res) {
    try {
      const { id } = req.params;
      const result = await HeroBanner.destroy({
        where: {
          id,
        },
      });
      if (result === 0) throw { name: "DataNotFound" };
      res.status(200).json({ message: "Hero Banner deleted" });
    } catch (error) {
      console.log(error);
      if (error.name === "DataNotFound") {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async getAllHeroBannerByDate(req, res) {
    try {
      const { date } = req.params;
      const parsedDate = new Date(date)
      const heroBanner = await HeroBanner.findAll({
        where: {
          startTime: {
            [Op.lte]: parsedDate,
          },
          endTime: {
            [Op.gte]: parsedDate,
          },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(heroBanner);      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ControllerHeroBanner;
