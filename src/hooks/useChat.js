// src/hooks/useChat.js
import { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";

export function useChat() {
  const { baseUrl } = useApi();
  const [messages, setMessages] = useState([]);

  // load previous messages once
  useEffect(() => {
    fetch(`${baseUrl}/api/chat/`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(
          data.map((m) => ({
            from: m.user_message ? "user" : "bot",
            text: m.user_message || m.bot_response,
          }))
        );
      });
  }, [baseUrl]);

  const sendMessage = async (user_message) => {
    setMessages((m) => [...m, { from: "user", text: user_message }]);
    const resp = await fetch(`${baseUrl}/api/chat/send/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_message }),
    }).then((r) => r.json());
    setMessages((m) => [...m, { from: "bot", text: resp.bot_response }]);
  };

  return { messages, sendMessage };
}
