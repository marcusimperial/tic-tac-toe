import { useEffect, useState } from "react";
import { useApp } from "./Context";

const Board = () => {

    const { turn, opponent, player, setTurn } = useApp();

    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]);

    const play = (row, column) => {
        if (turn?.id !== player?.id && opponent?.mode !== 'offline') return;
        if (board[row][column]) return;
        board[row][column] = turn?.sign;
        setBoard([ ...board ]);
        setTurn((turn?.id === player?.id) ? opponent : player);
    };

    const verdict = () => {
        // designed for ANY square grid (3x3, 4x4, 5x5...)

        // 1: check for row win 
        for (const row of board) if (row.reduce((a, b) => (a === b) ? a : false)) return console.log('WINNER');

        // 2: check for col win
        const cols = board.map((_, i) => board.map(r => r[i]));
        for (const col of cols) if (col.reduce((a, b) => (a === b) ? a : false)) return console.log('WINNER');

        // 3: check for diagonal wins
        const diags = [ board.map((r, i) => r[i]), board.map((r, i) => r[r.length - 1 -i]) ];
        for (const diag of diags) if (diag.reduce((a, b) => (a === b) ? a : false)) return console.log('WINNER');

        // 4: check to continue or draw
        for (const row of board) for (const cell of row) if (!cell) return;
        return console.log('DRAW');
    };

    useEffect(verdict, [board]); 

    return (
        <div className="grid justify-self-center grid-cols-3 bg-blue/80 grid-rows-3 p-3 text-white gap-2 rounded-lg w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <div onClick={() => play(0, 0)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[0][0]}</h1>
            </div>
            <div onClick={() => play(0, 1)}className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[0][1]}</h1>
            </div>
            <div onClick={() => play(0, 2)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[0][2]}</h1>
            </div>
            <div onClick={() => play(1, 0)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[1][0]}</h1>
            </div>
            <div onClick={() => play(1, 1)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[1][1]}</h1>
            </div>
            <div onClick={() => play(1, 2)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[1][2]}</h1>
            </div>
            <div onClick={() => play(2, 0)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[2][0]}</h1>
            </div>
            <div onClick={() => play(2, 1)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[2][1]}</h1>
            </div>
            <div onClick={() => play(2, 2)} className="flex place-content-center items-center border-4 border-white rounded-lg hover:bg-white/20">
                <h1 className="text-7xl md:text-9xl">{board[2][2]}</h1>
            </div>
        </div>
    )
};

export default Board;