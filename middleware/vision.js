"use strict"
var appConfig = require('../config');
var Vision = require('@google-cloud/vision');
const visonApiKey = appConfig.google_api.vision.key_url;
const project_id = appConfig.google_api.vision.project_id;
var Q = require('q');
module.exports = class {
    constructor(imgUri) {
        this.imgUri = imgUri;
        //auth vision api
        this.vision = new Vision({
            projectId: project_id,
            keyFilename: visonApiKey
        });
        //init request
        this.request = {
            source: {
                filename: this.imgUri
            }
        };
    }
    labelDetection() {
        let deferred = Q.defer();
        // Performs label detection on the image file
        this.vision.labelDetection(this.request)
            .then((results) => {
                deferred.resolve(results);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    }
    faceDetection() {
        let deferred = Q.defer();
        // Performs label detection on the image file
        this.vision.faceDetection(this.request)
            .then((results) => {
                deferred.resolve(results);
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    }
}