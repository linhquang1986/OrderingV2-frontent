var Speech = require('./speech');
var recor = require('./recognize');
exports.startSocket = (server) => {
    //socket
    var io = require('socket.io')(server);
    var speech = new Speech();
    io.on('connection', function (client) {
        var gstreams = null; // keeep track of speech streams
        console.log('Client connected...');
        client.on('startStream', function () {
            recor.streamingMicRecognize(client)
            //gstreams = speech.startGoogleSpeechStream(client);
        });
        client.on('buff', buf => {
            gstreams.write(buf)
        })
        client.on('restarting', () => {
            console.log('Start another stream');
            gstreams.end();
            gstreams = speech.startGoogleSpeechStream(client);
        })
        client.on('disconnect', () => {
            recor.closeStream();
            console.log('Client disconnected')
            //gstreams.end();
        })
    })
}
