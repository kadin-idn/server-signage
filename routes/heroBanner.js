const express = require("express");
const ControllerHeroBanner = require("../controllers/heroBanner");
const Authentication = require("../middlewares/authentication");
const { Authorization } = require("../middlewares/autthorization");

const HeroBanner = express.Router();

HeroBanner.get("/", ControllerHeroBanner.getAllHeroBanner);
HeroBanner.post("/", ControllerHeroBanner.createHeroBanner);
HeroBanner.get("/:date", ControllerHeroBanner.getAllHeroBannerByDate);
module.exports = HeroBanner;
