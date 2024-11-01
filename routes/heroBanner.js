const express = require('express');
const ControllerHeroBanner = require('../controllers/heroBanner');
const Authentication = require('../middlewares/authentication');
const { Authorization } = require('../middlewares/autthorization');
const HeroBanner = express.Router()

HeroBanner.get('/', (req, res) => {
    res.send('Hello World!')
})
HeroBanner.post('/', Authentication, Authorization, ControllerHeroBanner.createHeroBanner)

module.exports = HeroBanner