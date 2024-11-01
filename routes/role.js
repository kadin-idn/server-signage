const express = require('express');
const ControllerRole = require('../controllers/role');
const Authentication = require('../middlewares/authentication');
const Role = express.Router()

Role.get('/', Authentication,ControllerRole.getAllRole)

module.exports = Role