"use strict"
var vision = require('./vision');
var webS = require('./webSocketService');
var speech = require('./speech');
var wit = require('./witAi');
module.exports = {
    vision: vision,
    webS: webS,
    speech: speech,
    wit: wit
}