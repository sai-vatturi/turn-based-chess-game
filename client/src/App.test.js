import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import './App.css';

function App() {
  const [gameState, setGameState] = useState({
    board: Array(5).fill(Array(5).fill(null)),  // Initial empty board
  });

  const handleCellClick = (row, col) => {
    // Logic to handle cell click
  };

  return (
    <div className="App">
      <h1 className="text-xl font-bold text-center my-4">Chess-like Game</h1>
      <GameBoard gameState={gameState} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;