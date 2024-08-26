let gameState = {
    board: [],
    players: {
        player1: {
            characters: []
        },
        player2: {
            characters: []
        }
    },
    turn: 'player1',
    gameStatus: 'active'
};

function initializeCharacters(player) {
    let characters = [];
    if (player === 'player1') {
        characters = [
            {type: 'Pawn', position: {x: 0, y: 0}},
            {type: 'Hero1', position: {x: 1, y: 0}},
            {type: 'Hero2', position: {x: 2, y: 0}},
            {type: 'Pawn', position: {x: 3, y: 0}},
            {type: 'Pawn', position: {x: 4, y: 0}}
        ];
    } else {
        characters = [
            {type: 'Pawn', position: {x: 0, y: 4}},
            {type: 'Hero1', position: {x: 1, y: 4}},
            {type: 'Hero2', position: {x: 2, y: 4}},
            {type: 'Pawn', position: {x: 3, y: 4}},
            {type: 'Pawn', position: {x: 4, y: 4}}
        ];
    }
    return characters;
}

function initializeGame() {
    gameState.board = Array(5).fill().map(() => Array(5).fill(null));
    gameState.players.player1.characters = initializeCharacters('player1');
    gameState.players.player2.characters = initializeCharacters('player2');
    gameState.turn = 'player1';
    gameState.gameStatus = 'active';
    return gameState;
}

function moveCharacter(player, characterIndex, direction) {
    if (gameState.turn !== player) {
        return { success: false, message: "Not your turn" };
    }

    const character = gameState.players[player].characters[characterIndex];
    const moves = {
        'F': {x: 0, y: 1},   // Forward
        'B': {x: 0, y: -1},  // Backward
        'L': {x: -1, y: 0},  // Left
        'R': {x: 1, y: 0},   // Right
        'FL': {x: -1, y: 1}, // Forward-Left
        'FR': {x: 1, y: 1},  // Forward-Right
        'BL': {x: -1, y: -1},// Backward-Left
        'BR': {x: 1, y: -1}  // Backward-Right
    };

    if (moves[direction]) {
        const move = moves[direction];
        const newX = character.position.x + move.x;
        const newY = character.position.y + move.y;

        // Check board boundaries
        if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) {
            return { success: false, message: "Move out of bounds" };
        }

        // Update character position
        character.position.x = newX;
        character.position.y = newY;
        gameState.turn = gameState.turn === 'player1' ? 'player2' : 'player1';
        return { success: true, message: "Move successful" };
    } else {
        return { success: false, message: "Invalid move direction" };
    }
}

module.exports = {
    initializeGame,
    moveCharacter
};