import { useState } from "react";

const TURNS = {
  X: "❌",
  O: "⚪",
};

const COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const App = () => {
  const [board, setBoard] = useState<string[]>(new Array(9).fill(null));
  const [turn, setTurn] = useState<string>(TURNS.X);
  const [winner, setWinner] = useState<null>(null);

  const handleBoard = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const checkWinner = (board: string[]) => {
    for (const combo of COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(new Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <main className="flex w-full items-center justify-center flex-col  h-screen">
      <section className="grid grid-cols-3 gap-3">
        {board.map((item, index) => {
          return (
            <div
              onClick={() => handleBoard(index)}
              key={index}
              className="grid items-center justify-center text-5xl cursor-pointer border-2 border-black w-40 h-40"
            >
              {item}
            </div>
          );
        })}
      </section>

      {winner && (
        <section className="mt-14">
          <h3 className="text-xl text-center mb-4">Winner</h3>
          <div className=" flex items-center justify-center   text-5xl border-2 border-black w-40 h-40">
            {winner}
          </div>
          <button
            onClick={resetGame}
            className="text-xl text-white text-center w-full mt-2 h-10 border-gray-800 bg-blue-600 "
          >
            Reset
          </button>
        </section>
      )}
    </main>
  );
};
