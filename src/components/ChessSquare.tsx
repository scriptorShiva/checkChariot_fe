import React from "react";
import { useDrop } from "react-dnd";
import ChessPiece from "./ChessPiece";
import { PieceSymbol, Color } from "chess.js";

// rank: The rank (row) of the square.
// file: The file (column) of the square.
// isHighlighted: A boolean indicating if the square is highlighted (e.g., to indicate a possible move).
// piece: An object representing the piece on the square, or null if the square is empty.
// onClick: A function to handle click events on the square.
// onDrop: A function to handle drop events when a piece is dropped on the square.
interface ChessSquareProps {
  rank: number;
  file: number;
  isHighlighted: boolean;
  piece: { type: PieceSymbol; color: Color } | null;
  onClick: () => void;
  onDrop: (fromPosition: string, toPosition: string) => void;
  gameTurn: string;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  rank,
  file,
  isHighlighted,
  piece,
  onClick,
  onDrop,
  gameTurn,
}) => {
  // utility function
  const getSquareName = (rank: number, file: number) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return `${files[file]}${8 - rank}`;
  };
  //The useDrop hook is used to make the square droppable:
  const [{ isOver }, drop] = useDrop({
    //Specifies that the square accepts draggable items of type "piece".
    accept: "piece",
    //A function that gets called when a piece is dropped on the square. It calls onDrop with the original position of the piece and the new position calculated using getSquareName.
    //The item property in the useDrag hook specifies the data that will be carried with the draggable item :When a piece is dropped onto a ChessSquare, the useDrop hook in the ChessSquare component receives the item data, which includes the piece type, color, and original position.
    //The drop function in the useDrop hook calls the onDrop function passed to the ChessSquare component, providing the original position (item.position) and the new position (getSquareName(rank, file)).
    drop: (item: { piece: PieceSymbol; color: Color; position: string }) => {
      onDrop(item.position, getSquareName(rank, file));
    },
    //  A function that monitors the drop state and returns an object with isOver, indicating whether a draggable item is currently being dragged over the square.
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const squareColor = (rank + file) % 2 === 0 ? "light" : "dark";
  const highlightClass = isHighlighted ? "highlight" : "";
  const overClass = isOver ? "over" : "";

  return (
    <div
      ref={drop}
      className={`w-full h-full flex justify-center items-center ${squareColor} ${highlightClass} ${overClass}`}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: squareColor === "light" ? "#00796B" : "#CFD8DC",
        aspectRatio: "1.5",
      }}
      onClick={onClick}
    >
      {piece && (
        <ChessPiece
          piece={piece.type}
          color={piece.color}
          position={getSquareName(rank, file)}
          gameTurn={gameTurn}
        />
      )}
    </div>
  );
};

export default ChessSquare;
