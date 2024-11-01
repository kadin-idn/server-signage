const express = require('express');
const ControllerRole = require('../controllers/role');
const Role = express.Router()

Role.get('/', ControllerRole.getAllRole)

module.exports = Role