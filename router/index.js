"use strict"
var express = require('express');
var router = express.Router();

let wit = require('./witAi');

router.use('/wit', wit);

module.exports = router;