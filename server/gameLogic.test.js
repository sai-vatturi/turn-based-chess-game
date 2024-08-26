const { initializeGame, moveCharacter } = require('./gameLogic');

describe('Game Logic Tests', () => {
  let gameState;

  beforeEach(() => {
    gameState = initializeGame();
  });

  test('Handles moves correctly', () => {
    // Assuming Hero1 starts at {x: 1, y: 0} and moves "Forward"
    moveCharacter('player1', 1, 'F');  // Index 1, assuming it corresponds to Hero1
    const expectedPosition = {x: 1, y: 1};  // Expected new position after move
    expect(gameState.players.player1.characters[1].position).toEqual(expectedPosition);
  });
});