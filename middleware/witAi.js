"use strict"
var { Wit } = require('node-wit');
module.exports = class {
    constructor(witAiAccessToken) {
        this.client = new Wit({
            accessToken: witAiAccessToken
        })
    }
    sent(message, callback) {
        this.client.message(message, {})
            .then((data) => {
                callback(data);
            });
    }
}