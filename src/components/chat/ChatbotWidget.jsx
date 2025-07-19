// src/components/chat/ChatbotWidget.jsx
import { useChat } from "../../hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "./ChatbotWidget.css";

export default function ChatbotWidget() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(text);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-widget"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="chatbot-header">
              <button
                aria-label="Close chat"
                className="chatbot-close"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
            <div ref={containerRef} className="chatbot-messages">
              {messages.map((m, i) => (
                <div key={i} className={`message-row ${m.from}`}>
                  <motion.div
                    className="message-bubble"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {m.text}
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="chatbot-input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message…"
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        aria-label="Open chat"
        className="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        animate={open ? { rotate: 45 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        💬
      </motion.button>
    </div>
  );
}
