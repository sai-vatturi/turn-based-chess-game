import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GameBoard from './GameBoard';
import './App.css';

const socket = io('http://localhost:3000'); // Connect to the backend, adjust the URL as necessary

function App() {
  const [gameState, setGameState] = useState({
    board: Array(5).fill(Array(5).fill(null)),  // Initial empty board
    currentPlayer: ''
  });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    socket.on('state_update', newGameState => {
      setGameState(newGameState);
    });

    socket.on('waiting', message => {
      console.log(message);  // Log waiting messages, e.g., waiting for another player
    });

    return () => {
      socket.off('state_update');
      socket.off('waiting');
    };
  }, []);

  const handleCellClick = (row, col) => {
    const cell = gameState.board[row][col];
    if (cell && cell.player === gameState.currentPlayer) {
      setSelected({ row, col, character: cell });
    } else {
      setSelected(null);
    }
  };

  const calculatePossibleMoves = (cell, row, col) => {
    // Placeholder for move calculation logic based on character type and position
    let moves = [];
    if (cell.type === 'Hero1') {
      // Example moves for Hero1, adjust based on your game's logic
      moves = [{row: row + 1, col}, {row: row - 1, col}, {row, col: col + 1}, {row, col: col - 1}];
    } else if (cell.type === 'Hero2') {
      // Diagonal moves for Hero2
      moves = [{row: row + 1, col: col + 1}, {row: row - 1, col: col - 1}, {row: row + 1, col: col - 1}, {row: row - 1, col: col + 1}];
    }
    return moves.filter(move => move.row >= 0 && move.row < 5 && move.col >= 0 && move.col < 5);  // Filter out out-of-bounds moves
  };

  return (
    <div className="App">
      <h1>Chess-like Game</h1>
      <h2>Current Player: {gameState.currentPlayer}</h2>
      <GameBoard gameState={gameState} onCellClick={handleCellClick} selected={selected} />
      {selected && (
        <div>
          Selected: {selected.character.player}-{selected.character.type}
          <div>Possible Moves: {calculatePossibleMoves(selected.character, selected.row, selected.col).map(move => `(${move.row}, ${move.col})`).join(', ')}</div>
        </div>
      )}
    </div>
  );
}

export default App;