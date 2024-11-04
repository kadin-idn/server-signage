const express = require('express');
const ControllerRoom = require('../controllers/room');
const Authentication = require('../middlewares/authentication');
const { Authorization } = require('../middlewares/autthorization');
const Room = express.Router();

Room.get("/", Authentication ,ControllerRoom.getAllRoom);
Room.post("/", Authentication , Authorization, ControllerRoom.createRoom);

module.exports = Room;