// src/components/chat/ChatbotWidget.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
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
      setMessages((m) => [...m, { from: "bot", text: "Oops, try again." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.from === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <motion.div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                m.from === "bot"
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "bg-teal-500 text-white"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {m.text}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
        <input
          className="flex-1 px-4 py-2 rounded-l-xl bg-gray-100 dark:bg-gray-700 focus:outline-none placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your message…"
        />
        <button
          onClick={send}
          className="px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-r-xl transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
