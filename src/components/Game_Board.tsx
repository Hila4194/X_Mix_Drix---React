import React from 'react';
import './Game_Board.css';

interface GameBoardProps {
    board: (string | null)[];
    onCellClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick }) => {
    return (
        <div className="game-board">
            {board.map((cell, index) => (
                <div
                    key={index}
                    className="cell"
                    onClick={() => onCellClick(index)}
                >
                    <img
                        src={cell ? (cell === 'X' ? '/x.png' : '/o.png') : '/square.png'}
                        alt={cell || 'Empty'}
                        className="cell-image"
                    />
                </div>
            ))}
        </div>
    );
};

export default GameBoard;