import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ChatbotWidget.css";

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    try {
      const resp = await fetch("/api/chat/send/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_message: text }),
      }).then((r) => r.json());
      setMessages((m) => [...m, { from: "bot", text: resp.bot_response }]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Oops, something went wrong." },
      ]);
    }
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
              <button className="chatbot-close" onClick={() => setOpen(false)}>
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
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
              />
              <button onClick={send}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
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
