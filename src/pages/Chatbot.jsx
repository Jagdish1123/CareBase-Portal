import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = "AIzaSyDxhh5yQ4FnjiX-_1C_ath3odRSRcOBR34";
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm **HealthSync AI**, your virtual doctor. How can I assist you with your health today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const result = await model.generateContent(`You are HealthSync AI, a professional doctor. Answer in a professional and medically accurate manner. Question: ${input}`);
      const response = await result.response;
      const botReply = { text: response.text(), sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error fetching response!", sender: "bot" }]);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-white">HealthSync AI - Your Virtual Doctor</h2>
      <div className="w-full bg-[#13131A] p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
        <div ref={chatContainerRef} className="h-[600px] overflow-y-auto border p-4 border-white rounded-lg">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 my-2 rounded-md w-fit max-w-[80%] ${
                msg.sender === "user" ? "bg-[#00C54E] text-black ml-auto" : "bg-gray-700 text-white"
              }`}
              style={{ animation: "fadeIn 0.3s ease-in-out" }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask HealthSync AI a medical question..."
            className="flex-grow p-3 rounded-l bg-gray-800 text-white border border-white focus:outline-none"
          />
          <button 
            onClick={handleSendMessage}
            className="p-3 px-6 bg-[#00C54E] text-black rounded-r hover:bg-[#008F3F] transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
