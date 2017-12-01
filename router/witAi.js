"use strict"
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var witController = require('../controllers').witController;
var header = require('../auth/setHearder');

router.use(bodyParser.json());
router.use(header);

router.post('/message', witController.message)

router.post('/addValue',witController.addValue)

module.exports = router;