import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Apne backend server ka port/URL yahan set karein (e.g. http://localhost:5000)
const socket = io("http://localhost:5000");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    // handle connect
    socket.on("connect", () => {
      setIsConnected(true);
      setSocketId(socket.id);
      console.log("connected to server", socket.id);
    });

    // handle disconnect
    socket.on("disconnect", () => {
      setIsConnected(false);
      setSocketId("");
      console.log("disconnected from server");
    });

    // cleanup listener on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <h1>Socket.io</h1>

      <p>
        status:{" "}
        <strong style={{ color: isConnected ? "green" : "red" }}>
          {isConnected ? "connected" : "disconnected"}
        </strong>
      </p>

      {isConnected && (
        <p style={{ color: "gray", marginTop: "10px" }}>
          your socket ID: {socketId}
        </p>
      )}
    </div>
  );
}

export default App;