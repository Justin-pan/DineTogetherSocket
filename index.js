var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log("new connection");
  socket.on('signIn', function(name){
    socket.userName = name;
  });
  socket.on('joinRoom', function(roomname){
    console.log("joined" + roomname);
    var message = socket.userName + "has joined";
    socket.join(roomname);
    io.in(roomname).emit('joinmessage', message)
  });
  socket.on('message', function(roomname, message, email, name){
    console.log("message sent to" + roomname)
    socket.broadcast.to(roomname).emit('message', roomname, message, email, name);
  });
});
console.log("server listening on" + process.env.PORT)
