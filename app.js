var express = require('express');
var path = require('path');
var app = express();
var router = require('./router')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
})
var listener = app.listen(3030, () => {
    console.log('Server running on localhost:' + listener.address().port);
})
// socket
var socket = require('./middleware').webS;
socket.startSocket(listener);