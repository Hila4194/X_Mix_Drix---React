import React, { useState } from 'react';
import GameBoard from './components/Game_Board';
import './App.css';

const App: React.FC = () => {
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null)); // Track board state
    const [isXNext, setIsXNext] = useState(true); // Track current player
    const [xWins, setXWins] = useState(0); // Player X wins count
    const [oWins, setOWins] = useState(0); // Player O wins count
    const [gameMessage, setGameMessage] = useState('Current Player: X'); // Game message
    const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over

    const calculateWinner = (board: (string | null)[]): string | null => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6],           // Diagonals
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };
    
    const handleCellClick = (index: number) => {
        if (board[index] || isGameOver) return; // Ignore clicks on filled cells or if game is over
    
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
    
        const winner = calculateWinner(newBoard);
        if (winner) {
            setIsGameOver(true);
            setGameMessage(`Player ${winner} Wins!`);
            if (winner === 'X') {
                setXWins(xWins + 1);
            } else {
                setOWins(oWins + 1);
            }
        } else if (newBoard.every(cell => cell)) {
            setIsGameOver(true);
            setGameMessage("It's a Draw!");
        } else {
            setIsXNext(!isXNext);
            setGameMessage(`Current Player: ${isXNext ? 'O' : 'X'}`);
        }
    };

      const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameMessage('Current Player: X');
        setIsGameOver(false);
    };
  
    return (
        <div className="App container text-center">
            <header className="my-4">
                <h1 style={{ fontWeight: "bold", textDecoration: "underline", color: 'darkblue' }}>X Mix Drix</h1>
            </header>
            {/* Horizontal scoreboard */}
            <div className="scoreboard d-flex justify-content-around align-items-center my-4">
                <div className="score">
                    <h5 style={{ fontWeight: "bold"}}>Player: X</h5>
                    <p className="badge bg-danger fs-5">{xWins}</p>
                </div>
                <div className="score">
                    <h5 style={{ fontWeight: "bold"}}>Player: O</h5>
                    <p className="badge bg-primary fs-5">{oWins}</p>
                </div>
            </div>
            <p className="turn-indicator fw-bold">{gameMessage}</p>

            <GameBoard board={board} onCellClick={handleCellClick} />

            {isGameOver && (
                <button className="btn btn-outline-success mt-4" onClick={resetBoard}>
                    Play Again!
                </button>
            )}
        </div>
    );
};

export default App;