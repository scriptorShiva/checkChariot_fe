import React, { useState, useCallback, useEffect } from "react";
import { Chess, PieceSymbol, Color } from "chess.js";
import useSocket from "../hooks/useSocket";
import ChessSquare from "./ChessSquare";

interface ChessBoardProps {
  gameId: string;
  gameTurn: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameId, gameTurn }) => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinGame", { gameId });
    });

    socket.on("moveMade", (move: { from: string; to: string }) => {
      const updatedGame = new Chess(fen);
      updatedGame.move(move);
      setChess(updatedGame);
      setFen(updatedGame.fen());
    });

    socket.on("boardUpdate", (boardState: string) => {
      const updatedGame = new Chess(boardState);
      setChess(updatedGame);
      setFen(updatedGame.fen());
    });

    return () => {
      socket.off("connect");
      socket.off("moveMade");
      socket.off("boardUpdate");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, fen, socket]);

  const handleMove = useCallback(
    (from: string, to: string) => {
      if (!socket) return;

      const move = { from, to };
      const updatedGame = new Chess(fen);
      const validMove = updatedGame.move(move);
      console.log("validMove", validMove);

      if (validMove) {
        setChess(updatedGame);
        setFen(updatedGame.fen());
        socket.emit("makeMove", { gameId, move });
      } else {
        console.log("Invalid move");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fen, gameId, socket]
  );

  const handleSquareClick = (square: string) => {
    if (selectedSquare) {
      handleMove(selectedSquare, square);
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  const renderSquare = (
    square: { type: PieceSymbol; square: string; color: Color } | null,
    rank: number,
    file: number
  ) => {
    const squareId = `${rank}-${file}`;
    return (
      <ChessSquare
        key={squareId}
        rank={rank}
        file={file}
        piece={square}
        isHighlighted={selectedSquare === square?.square}
        onClick={() => handleSquareClick(square!.square)}
        onDrop={handleMove}
        gameTurn={gameTurn}
      />
    );
  };

  const renderBoard = () => {
    const board = chess.board();
    console.log(board);
    return board.map((row, rank) =>
      row.map((square, file) => renderSquare(square, rank, file))
    );
  };

  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-1 w-auto h-auto">
      {renderBoard()}
    </div>
  );
};

export default ChessBoard;
