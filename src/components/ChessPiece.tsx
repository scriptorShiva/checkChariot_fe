import React from "react";
import { useDrag } from "react-dnd";
import { PieceSymbol, Color } from "chess.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessPawn,
  faChessRook,
  faChessKnight,
  faChessBishop,
  faChessQueen,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChessPawn as faChessPawnOutlined,
  faChessRook as faChessRookOutlined,
  faChessKnight as faChessKnightOutlined,
  faChessBishop as faChessBishopOutlined,
  faChessQueen as faChessQueenOutlined,
  faChessKing as faChessKingOutlined,
} from "@fortawesome/free-regular-svg-icons";

interface ChessPieceProps {
  piece: PieceSymbol;
  color: Color;
  position: string;
  gameTurn: string;
}

const ChessPiece: React.FC<ChessPieceProps> = ({
  piece,
  color,
  position,
  gameTurn,
}) => {
  // The preview ref is used as a fallback when the piece cannot be dragged, ensuring the piece remains visible but non-draggable.
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      //Specifies the type of draggable item.
      type: "piece",
      // This information can be accessed when the piece is dropped.
      item: { piece, color, position },
      canDrag: () => color === gameTurn,
      //A function that monitors the dragging state. It returns an object with isDragging, indicating whether the piece is currently being dragged.
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [color, gameTurn]
  );
  const pieceIcon = getPieceIcon(piece, color); // A function to return the piece icon based on type and color
  return (
    <div
      ref={color === gameTurn ? drag : preview}
      className={`grid justify-center items-center text-4xl ${
        gameTurn === color ? "cursor-grab" : "cursor-not-allowed"
      } stroke-black  `}
      style={{
        opacity: isDragging ? 0 : 1,
        backgroundColor: isDragging ? "transparent" : "initial",
      }}
    >
      <FontAwesomeIcon icon={pieceIcon} />
    </div>
  );
};

// Example function to get piece icon
const getPieceIcon = (piece: PieceSymbol, color: Color) => {
  console.log(piece, color);
  const pieceMap = {
    p: color === "w" ? faChessPawnOutlined : faChessPawn,
    r: color === "w" ? faChessRookOutlined : faChessRook,
    n: color === "w" ? faChessKnightOutlined : faChessKnight,
    b: color === "w" ? faChessBishopOutlined : faChessBishop,
    q: color === "w" ? faChessQueenOutlined : faChessQueen,
    k: color === "w" ? faChessKingOutlined : faChessKing,
  };

  return pieceMap[piece];
};

export default ChessPiece;
