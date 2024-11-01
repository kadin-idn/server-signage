const express = require("express");
const ControllerHeroBanner = require("../controllers/heroBanner");
const Authentication = require("../middlewares/authentication");
const { Authorization } = require("../middlewares/autthorization");
const fileUpload = require("express-fileupload");
const HeroBanner = express.Router();

HeroBanner.use(
  fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 }, 
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
  })
);
HeroBanner.get("/", ControllerHeroBanner.getAllHeroBanner);
HeroBanner.post("/", ControllerHeroBanner.createHeroBanner);
HeroBanner.get("/:date", ControllerHeroBanner.getAllHeroBannerByDate);
module.exports = HeroBanner;
