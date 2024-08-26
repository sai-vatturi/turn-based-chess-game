// GameBoard.js
function GameBoard({ gameState, onCellClick, selected, setSelected }) {
    function isSelected(row, col) {
        return selected && selected.row === row && selected.col === col;
    }

    function renderCellContent(cell) {
        if (!cell) return '';
        return `${cell.player}-${cell.type}`;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '5px' }}>
            {gameState.board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: isSelected(rowIndex, colIndex) ? 'lightblue' : 'white',
                            border: '1px solid black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelected({ row: rowIndex, col: colIndex })}
                    >
                        {renderCellContent(cell)}
                    </div>
                ))
            )}
        </div>
    );
}

export default GameBoard;