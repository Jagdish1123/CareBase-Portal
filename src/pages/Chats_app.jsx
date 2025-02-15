import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";


const socket = io.connect("http://localhost:3001");

function Chats_app() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#13131A] p-4">
            {!showChat ? (
                <div className="bg-[#1E1E29] shadow-lg rounded-lg p-8 w-full max-w-md transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl text-white">
                    <h3 className="text-2xl font-semibold text-center mb-6">Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Enter your name..."
                        onChange={(event) => setUsername(event.target.value)}
                        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter Room ID..."
                        onChange={(event) => setRoom(event.target.value)}
                        className="w-full mb-6 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={joinRoom}
                        className="w-full px-4 py-2 bg-[#00C54E] text-black rounded-md hover:bg-[#008F3F] transition-all hover:scale-110"
                    >
                        Join A Room
                    </button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}


export default Chats_app;
