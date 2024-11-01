const express = require("express");
const ControllerHeroBanner = require("../controllers/heroBanner");
const Authentication = require("../middlewares/authentication");
const { Authorization } = require("../middlewares/autthorization");
const fileUpload = require("express-fileupload");
const HeroBanner = express.Router();

HeroBanner.get("/", (req, res) => {
  res.send("Hello World!");
});
HeroBanner.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Batas ukuran file 50MB
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
  })
);
HeroBanner.post(
  "/",
  ControllerHeroBanner.createHeroBanner
);
module.exports = HeroBanner;
