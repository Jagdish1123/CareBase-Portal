import  { useState, useEffect, useRef } from "react";

const apiKey = ""; // Replace with your actual API key

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm <b>HealthSync AI</b>, your virtual doctor. How can I assist you with your health today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const formatText = (text) => {
    let formattedText = text;
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    formattedText = formattedText.replace(/^- (.*?)$/gm, `<li>$1</li>`);
    formattedText = `<ul>${formattedText}</ul>`.replace(/<ul><\/li>|<\/ul><li>/g, '');
    formattedText = formattedText.replace(/\n/g, "<br/>");
    return formattedText;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `You are HealthSync AI, a professional doctor. 
      Answer in a professional and medically accurate manner. 
      Use clear headings and bullet points for better readability where appropriate. 
      Question: ${input}`;

      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 && result.candidates[0].content) {
        const botText = result.candidates[0].content.parts[0].text;
        const formattedReply = formatText(botText);
        const botReply = { text: formattedReply, sender: "bot" };
        setMessages((prev) => [...prev, botReply]);
      } else {
        setMessages((prev) => [...prev, { text: "Error: No response from the AI.", sender: "bot" }]);
      }
    } catch (error) {
      console.error("Failed to fetch response:", error);
      setMessages((prev) => [...prev, { text: "An error occurred while fetching the response. Please try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-white">HealthSync AI - Your Virtual Doctor</h2>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-3xl shadow-2xl flex flex-col h-[70vh]">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 border border-gray-700 rounded-xl bg-gray-900 custom-scrollbar">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl max-w-[80%] transition-all duration-300 ease-in-out transform ${
                msg.sender === "user" ? "bg-green-500 text-gray-900 ml-auto" : "bg-gray-700 text-white"
              }`}
              style={{ animation: "fadeInUp 0.3s forwards" }}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
          {loading && (
            <div className="p-4 rounded-xl max-w-[80%] bg-gray-700 text-white animate-pulse">
              <span className="inline-block h-4 w-4 bg-gray-500 rounded-full mr-2"></span>
              <span className="inline-block h-4 w-4 bg-gray-500 rounded-full mr-2"></span>
              <span className="inline-block h-4 w-4 bg-gray-500 rounded-full"></span>
            </div>
          )}
        </div>
        <div className="flex mt-6">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
            placeholder="Ask HealthSync AI a medical question..."
            className="flex-grow p-4 rounded-l-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
          <button 
            onClick={handleSendMessage}
            className="p-4 px-8 bg-green-500 text-gray-900 rounded-r-full hover:bg-green-600 transition-all duration-200 shadow-md"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
