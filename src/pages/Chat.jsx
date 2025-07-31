import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ScrollToBottom from "react-scroll-to-bottom";
import { FaPaperPlane } from "react-icons/fa";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage.trim() === "") return;

    const messageData = {
      room,
      author: username,
      message: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageList((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 p-4 font-sans">
      <div className="flex flex-col w-full max-w-2xl h-full bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-700">
        <div className="bg-green-500 text-gray-900 p-4 text-center text-xl font-bold">
          <p>Doctor-Patient Chat - Room: {room}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
          <ScrollToBottom className="h-full flex flex-col gap-4">
            {messageList.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] p-3 rounded-xl shadow-md transition-all duration-300 ${
                  username === msg.author
                    ? "bg-green-500 text-gray-900 self-end"
                    : "bg-gray-700 text-white self-start"
                }`}
              >
                <p className="break-words text-sm">{msg.message}</p>
                <div className="text-xs opacity-75 mt-2 flex justify-between font-light">
                  <span>{msg.author}</span>
                  <span>{msg.time}</span>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="flex items-center gap-2 p-4 border-t border-gray-700 bg-gray-900 rounded-b-2xl">
          <input
            type="text"
            value={currentMessage}
            placeholder="Ask your doctor a question..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-grow p-3 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-green-500 text-gray-900 rounded-full hover:bg-green-600 transition-transform transform hover:scale-110 shadow-lg"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  socket: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default Chat;
