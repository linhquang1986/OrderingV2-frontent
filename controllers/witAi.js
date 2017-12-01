"use strict"
var Wit = require('../middleware').wit;
var appConfig = require('../config');
var request = require('request');
var fetch = require('isomorphic-fetch');

var witAiAccessToken = appConfig.wit_ai.myAccessToken;
let wit = new Wit(witAiAccessToken);
exports.message = (req, res) => {
    let message = req.body.message;
    wit.sent(message, (rs) => {
        res.send(rs)
    });
}

exports.addValue = (req, res) => {
    let entitiId = req.body.entitiId;
    let data = {
        value: req.body.value,
        expressions: req.body.expressions,
        metadata: req.body.metadata
    }
    // fetch('https://api.wit.ai/entities/' + entitiId + '/values?v=20170307', {
    //     method: "POST",
    //     headers: {
    //         'Authorization': 'Bearer ' + witAiAccessToken,
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/vnd.wit.20160516json'
    //     },
    //     body: JSON.stringify(data)
    // }).then(ress => {
    //     res.json({ res: ress })
    // })
    request({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer C77Y5J5QCH2MQ6CVJ2BLGZVVXNC7PW4R',
            'Content-Type': 'application/json',
        },
        url: 'https://api.wit.ai/entities/' + entitiId + '/values',
        form: JSON.stringify(data)
    }, (err, ress, body) => {
        res.json({ res: ress, body: body, err: err });
    })
}