import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useWebSocket = () => {
    const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  });

  return { messages, sendMessage: (msg) => socket.emit("message", msg) };
};

export default useWebSocket;
