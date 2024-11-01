const express = require('express');
const ControllerHeroBanner = require('../controllers/heroBanner');
const HeroBanner = express.Router()

HeroBanner.get('/', (req, res) => {
    res.send('Hello World!')
})
HeroBanner.post('/', ControllerHeroBanner.createHeroBanner)

module.exports = HeroBanner