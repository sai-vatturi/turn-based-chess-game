const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const gameLogic = require('./gameLogic');

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Initialize game when a new client connects
    gameLogic.initializeGame();

    socket.on('move', (data) => {
        const result = gameLogic.moveCharacter(data.player, data.characterIndex, data.direction);
        if (result.success) {
            io.emit('state_update', gameState);  // Update all clients with the new state
        } else {
            socket.emit('error', result.message);  // Send error message back to the client
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
  res.send("Server is running...");
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

