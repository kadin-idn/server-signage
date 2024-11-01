const express = require('express');
const ControllerRoom = require('../controllers/room');
const Authentication = require('../middlewares/authentication');
const Room = express.Router();

Room.get("/", Authentication ,ControllerRoom.getAllRoom);

module.exports = Room;