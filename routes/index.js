var app = require('express')()

var child = require('child_process');

exports.index = function(req, res){
   res.render('index', { title: 'Express' });
};

var clients = {};

function ensureVideo () {
  var args = [
      '-i', 'test.mp4', '-f', 'mpeg', '-'
   ];
  
   var ffmpeg = child.spawn('ffmpeg', args);

   ffmpeg.on('data', function (data) {
      clients.forEach(function (c) {
         c.emit('video', data);
      })
   })
}

io.sockets.on('connection', function (socket) {

   socket.on('video', function (data) {
      console.log('Video client connected.');
      clients[socket.id] = socket;
   });

   socket.on('disconnect', function () {
      console.log('Video client ' + socket.id + ' disconnected.');
      delete clients[socket.id];
   });

});