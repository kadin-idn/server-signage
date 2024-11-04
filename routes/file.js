const express = require("express");
const ControllerFile = require("../controllers/file");
const File = express.Router();

File.get("/:id", ControllerFile.getFileById);

module.exports = File;