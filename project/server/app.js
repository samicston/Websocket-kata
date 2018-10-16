var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(5000, function(){
    console.log('listening to request on port 5000')
});

//static file

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made sucket connection', socket.id)
    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
    })

    socket.on('private', (data) => {
        socket.emit('private', data)
    })

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
})