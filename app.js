﻿/// <reference path="node-vsdoc.js" />
/* Add Module Dependencies */
var socket = require('socket.io');
var express = require("express")
, app = express.createServer()
, server = app.listen(3000)
, stylus = require("stylus")
, nib = require("nib");

var io = socket.listen(server);


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib);
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  {
    src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.render('index',
    { title: 'Home' });
});

 //server.listen(3000);

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome to chat' });
  socket.on('send', function (data) {
    io.sockets.emit('message',data);
  });
});
