import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";

let socket: Socket | null = null;

const useSocket = () => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_SERVER_URL);

      socket.on("connect", () => {
        console.log("Connected to server with socket ID:", socket!.id);
        setSocketInstance(socket);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    } else {
      setSocketInstance(socket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null; // Reset socket to allow reconnection
      }
    };
  }, []);

  return socketInstance;
};

export default useSocket;
