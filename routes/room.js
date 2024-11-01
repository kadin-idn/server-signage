const express = require('express');
const ControllerRoom = require('../controllers/room');
const Room = express.Router();

Room.get("/", ControllerRoom.getAllRoom);

module.exports = Room;