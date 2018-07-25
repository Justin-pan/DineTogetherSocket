var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log("new connection");
  socket.on('signIn', function(name){
    socket.userName = name;
    console.log(socket.userName + " has signed in");
  });
  socket.on("reconnect", function(name){
    socket.userName = name;
    console.log(socket.userName + " has reconnected")
  });
  socket.on('joinRoom', function(roomname){
    console.log("joined" + roomname);
    socket.join(roomname);
  });
  socket.on('message', function(roomname, message, email, name, date, messageID){
    console.log("message sent to" + roomname)
    socket.broadcast.to(roomname).emit('message', roomname, message, email, name, date, messageID);
  });
  socket.on('disconnect', function(){
    console.log(socket.userName + " has disconnected");
  });
});
console.log("server listening on " + process.env.PORT)
