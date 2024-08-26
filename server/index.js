const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let waitingPlayer = null;
let gameStates = {};

app.get('/', (req, res) => {
    res.send('Server is running');
});
function initializeBoard() {
    let board = Array(5).fill().map(() => Array(5).fill(null));
    // Example setup: adjust according to your game rules
    board[0][0] = { type: 'Pawn', player: 'A' };
    board[0][1] = { type: 'Hero1', player: 'A' };
    board[0][2] = { type: 'Hero2', player: 'A' };
    board[4][0] = { type: 'Pawn', player: 'B' };
    board[4][1] = { type: 'Hero1', player: 'B' };
    board[4][2] = { type: 'Hero2', player: 'B' };
    return board;
}

// Use this function when setting up a new game
gameStates[gameId].board = initializeBoard();
io.on('connection', socket => {
    console.log('New connection:', socket.id);

    if (waitingPlayer) {
        // Start a new game
        const gameId = `${waitingPlayer.id}-${socket.id}`;
        gameStates[gameId] = {
            players: [waitingPlayer, socket],
            board: Array(5).fill().map(() => Array(5).fill(null)),
            currentPlayer: 'A'
        };
        [waitingPlayer, socket].forEach(s => s.join(gameId));
        io.to(gameId).emit('state_update', gameStates[gameId]);
        waitingPlayer = null; // Reset waiting player
    } else {
        waitingPlayer = socket; // Wait for another player
        waitingPlayer.emit('waiting', 'Waiting for another player to join...');
    }

    socket.on('move', (data) => {
        const gameId = Object.keys(gameStates).find(id => id.includes(socket.id));
        if (gameId) {
            const state = gameStates[gameId];
            console.log(`Move received from ${socket.id}:`, data);
            // Here, insert game logic to update the state based on the move
            state.currentPlayer = state.currentPlayer === 'A' ? 'B' : 'A'; // Toggle player turn for simplicity
            io.to(gameId).emit('state_update', state);
        }
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        if (waitingPlayer === socket) {
            waitingPlayer = null;
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});