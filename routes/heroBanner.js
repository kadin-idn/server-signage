const express = require("express");
const ControllerHeroBanner = require("../controllers/heroBanner");
const Authentication = require("../middlewares/authentication");
const { Authorization } = require("../middlewares/autthorization");

const HeroBanner = express.Router();

HeroBanner.get("/", ControllerHeroBanner.getAllHeroBanner);
HeroBanner.post("/", Authentication, Authorization, ControllerHeroBanner.createHeroBanner);
HeroBanner.delete("/:id",Authentication, Authorization, ControllerHeroBanner.deleteHeroBanner);
HeroBanner.get("/:date", ControllerHeroBanner.getAllHeroBannerByDate);
module.exports = HeroBanner;
