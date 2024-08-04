import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
import useSocket from "@/hooks/useSocket";
import ChessBoard from "@/components/ChessBoard";

export const GameBoard: React.FC = () => {
  const [gameId, setGameId] = useState("");
  const [gameTurn, setGameTurn] = useState("");
  const [isUserJoined, setIsUserJoined] = useState(false);
  const socket = useSocket();

  // console.log(socket);
  useEffect(() => {
    if (!socket) return;

    const handleGameJoined = ({
      gameId,
      color,
    }: {
      gameId: string;
      color: "white" | "black";
    }) => {
      setGameId(gameId);
      if (color) {
        setGameTurn(color.split("")[0]);
      }
      toast.success(`Joined game ${gameId} as ${color}!`, {
        position: "top-center",
      });
      setIsUserJoined(true);
    };

    const handleGameFull = (gameId: string) => {
      toast.error(`Game ${gameId} is full.`, {
        position: "top-center",
      });
    };

    // listen for server events if triggered
    socket.on("gameJoined", handleGameJoined);
    socket.on("gameFull", handleGameFull);

    return () => {
      socket.off("gameJoined", handleGameJoined);
      socket.off("gameFull", handleGameFull);
    };

    // In this example, the useEffect hook sets up the listeners for the gameJoined and gameFull events when the component mounts and removes them when the component unmounts using socket.off. This ensures that the event listeners are properly managed and don't cause memory leaks or multiple listeners being registered unintentionally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const joinGame = () => {
    if (socket) {
      // screamer - A
      socket.emit("joinGame");
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 bg-zinc-800">
        <div className="col-span-1 bg-zinc-700  rounded-sm h-screen p-2 ">
          <Button
            onClick={joinGame}
            disabled={isUserJoined}
            className="w-full bg-cyan-600 mt-2"
          >
            Start Game
          </Button>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className="col-span-2 bg-zinc-700 p-2 m-9">
            <ChessBoard gameId={gameId!} gameTurn={gameTurn} />
          </div>
        </DndProvider>
      </div>
    </>
  );
};
