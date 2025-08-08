import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Mic, MicOff } from "lucide-react";
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI farming assistant. I can help you with equipment recommendations, crop planning, and farming tips. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("tractor") || input.includes("equipment")) {
      return "For tractor rentals, I recommend checking our available tractors based on your farm size. Small farms (1-5 acres) work well with 25-35 HP tractors, while larger farms need 50+ HP. What's your farm size?";
    }

    if (input.includes("crop") || input.includes("planting")) {
      return "I can help with crop planning! The best crops depend on your location, soil type, and season. Popular options include wheat, corn, rice, and vegetables. What region are you farming in?";
    }

    if (input.includes("fertilizer") || input.includes("seeds")) {
      return "For fertilizers and seeds, I recommend checking soil pH first. Most crops need NPK fertilizers with ratios like 10-10-10 for balanced nutrition. Organic options include compost and manure. What crop are you planning to grow?";
    }

    if (input.includes("price") || input.includes("cost")) {
      return "Equipment rental prices vary by location and duration. Typical rates: Small tractors $150-300/day, Large tractors $400-800/day, JCB $300-600/day. Bulk discounts available for longer rentals. Need specific pricing for your area?";
    }

    if (input.includes("weather") || input.includes("season")) {
      return "Weather planning is crucial! I recommend checking local weather forecasts and seasonal patterns. Spring planting typically starts when soil temperature reaches 50°F. Would you like specific timing recommendations for your crop?";
    }

    return "I understand you're looking for farming assistance. I can help with equipment selection, crop planning, fertilizer recommendations, pricing information, and seasonal planning. Could you be more specific about what you need help with?";
  };

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Voice recognition error. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="chat-buttons">
        <button
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
          title="Open AI Assistant"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h3 style={{ margin: 0, fontSize: "16px" }}>AI Farming Assistant</h3>
          <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>
            Ask me about equipment, crops, or farming tips
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}

        {isTyping && (
          <div className="chat-message bot">
            <div style={{ display: "flex", gap: "4px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#94a3b8",
                  borderRadius: "50%",
                  animation: "bounce 1.4s infinite ease-in-out",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#94a3b8",
                  borderRadius: "50%",
                  animation: "bounce 1.4s infinite ease-in-out 0.2s",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#94a3b8",
                  borderRadius: "50%",
                  animation: "bounce 1.4s infinite ease-in-out 0.4s",
                }}
              ></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about equipment, crops, farming tips..."
          disabled={isTyping}
        />
        <button
          onClick={handleVoiceInput}
          disabled={isTyping || isListening}
          style={{
            background: isListening ? "#dc2626" : "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Voice input"
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <button onClick={sendMessage} disabled={!inputText.trim() || isTyping}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
