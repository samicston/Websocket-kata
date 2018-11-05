var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(process.env.APP_PORT, function(){
    console.log(`listening to request on port ${process.env.APP_PORT}`);
});

//static file

app.use(express.static('public'));

//Socket setup
var io = socket(server);
var group1 = [];
var group2 = [];
io.on('connection', function(socket){
    console.log('made sucket connection', socket.id)
    socket.on('chat', function(data){
        let group = JSON.parse(data).group;
        console.log(group, '...', group1, '+++', group2) 
        if(group == 1){
            if(!group1.includes(socket.id)){
                group1.push(socket.id);
            }
            for(let i = 0; i < group1.length; i++){
                io.sockets.connected[group1[i]].emit('chat', data);
            }
        }else if(group == 2){
            if(!group2.includes(socket.id)){
                group2.push(socket.id);
            }
            for(let i = 0; i < group2.length; i++){
                io.sockets.connected[group2[i]].emit('chat', data);
            }
        }else{
            io.sockets.emit('chat', data)
        }
    })

    socket.on('private', (data) => {
        socket.emit('private', data)
    })

    socket.on('typing', function(data){
        let group = JSON.parse(data).group;
        if(group == 1){
            socket.join('group 1');
            socket.broadcast.to('group 1').emit('typing', data);
        }else if(group == 2){
            socket.join('group 2');
            socket.broadcast.to('group 2').emit('typing', data);
        }else{
            socket.broadcast.emit('typing', data);
        }
    })
})