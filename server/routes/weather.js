/* Using ES5, Begin */
var express = require('express');
var router = express.Router();

// API Require controller modules.
var weather = require('../controllers/api/weatherController');
router.get('/get-weather/:cityOrZipCode/:cityZip?', weather.getCityWeather);

router.post('/get-weather/:cityOrZipCode', weather.getCitiesWeather);

module.exports = router;
/* Using ES5, End */

/* Using ES6, Begin */
/*
import express from 'express';
import {
    getCityWeather,
    getCitiesWeather
} from '../controllers/api/weatherController';
const router = express.Router();

router.get('/get-city-weather/:city?', getCityWeather);
router.post('/get-cities-weather', getCitiesWeather);

module.exports = router;
*/
/* Using ES6, End */