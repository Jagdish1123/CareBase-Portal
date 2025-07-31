import  { useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Chat from "./Chat";

// The socket connection URL needs to be configured correctly for your backend.
// This is a placeholder and should be updated with the correct server address.
const socket = io.connect("http://localhost:3001");

function Chats_app() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username.trim() !== "" && room.trim() !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 font-sans text-white">
      {!showChat ? (
        <motion.div
          className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-8 text-3xl font-extrabold text-center text-white">Join a Chat</h3>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(event) => setUsername(event.target.value)}
            className="mb-4 w-full rounded-full border border-gray-600 bg-gray-700 px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Enter Room ID..."
            onChange={(event) => setRoom(event.target.value)}
            className="mb-8 w-full rounded-full border border-gray-600 bg-gray-700 px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <motion.button
            onClick={joinRoom}
            className="w-full rounded-full bg-green-500 py-3 text-lg font-bold text-gray-900 transition-colors duration-200 hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join A Room
          </motion.button>
        </motion.div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chats_app;
