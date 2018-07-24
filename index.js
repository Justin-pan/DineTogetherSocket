var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(3000);
var io = require('socket.io');

app.use(express.static('./public'));

io.on('connection', function(socket){
  console.log("new connection");
  socket.on('signIn', function(data){
    socket.userName = data.name;
  });
  socket.on('joinRoom', function(data){
    console.log("joined" + data.roomname);
    var message = socket.userName + "has joined";
    socket.join(data.roomname);
    io.in(data.roomname).emit('joinmessage', message)
  });
  socket.on('message', function(data){
    console.log("message sent to" + data.roomname)
    socket.broadcast.to(data.roomname).emit('message', { roomname: data.roomname, email: data.email, name: socket.userName, message: data.message });
  });
});
