const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;
const { Server } = require('socket.io');

app.use(cors());
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket)=>{
    console.log(`user connected at ${socket.id}`);
    socket.on('join_room', (data)=>{ 
        socket.join(data); 
        console.log(`user ${socket.id} joined  room ${data}`);
    });

    socket.on('send_message', (data)=>{
          socket.to(data.room ).emit('receive_message', data); 
    });

    socket.on('disconnect', ()=>{
        console.log(`user disconnected at ${socket.id}`);
    });
})







server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})