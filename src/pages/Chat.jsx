import { useEffect, useState } from "react";
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
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#13131A] p-4">
      <div className="flex flex-col w-full max-w-2xl h-full bg-[#1E1E2E] shadow-lg rounded-lg overflow-hidden border border-gray-700">
        <div className="bg-[#00C54E] text-black p-4 text-center text-lg font-semibold">
          <p>Doctor-Patient Chat - Room: {room}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ScrollToBottom className="flex flex-col gap-4">
            {messageList.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] p-3 rounded-lg shadow-md transition-all duration-300 ${
                  username === msg.author
                    ? "bg-[#00C54E] text-black self-end"
                    : "bg-gray-700 text-white self-start"
                }`}
              >
                <p className="break-words">{msg.message}</p>
                <div className="text-xs opacity-75 mt-2 flex justify-between">
                  <span>{msg.author}</span>
                  <span>{msg.time}</span>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="flex items-center gap-2 p-4 border-t border-gray-600 bg-gray-800 rounded-b-lg">
          <input
            type="text"
            value={currentMessage}
            placeholder="Ask your doctor a question..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#00C54E]"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-[#00C54E] text-black rounded-full hover:bg-[#008F3F] transition-transform transform hover:scale-110"
          >
            <FaPaperPlane />
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
