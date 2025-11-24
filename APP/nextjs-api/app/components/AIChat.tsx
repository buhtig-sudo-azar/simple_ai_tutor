"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp?: Date;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Добавляем начальное сообщение только на клиенте
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Привет! Я AI-наставник по веб-разработке. Спроси меня о React, Next.js, JavaScript, базах данных или DevOps! 🚀",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "❌ Ошибка соединения. Проверьте подключение к интернету.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "Что такое React?",
    "Объясни Next.js",
    "Как работает JavaScript?",
    "Что такое TypeScript?",
    "Расскажи о базах данных",
  ];

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>☁️ Серверный AI</h1>
        <p style={{ margin: "5px 0 0 0", opacity: 0.9 }}>
          Мощные модели через API
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
          Быстрые вопросы:
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                border: "1px solid #667eea",
                background: "transparent",
                color: "#667eea",
                borderRadius: "16px",
                cursor: "pointer",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          padding: "20px",
          background: "#f8f9fa",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent: message.isUser ? "flex-end" : "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "18px",
                background: message.isUser ? "#667eea" : "white",
                color: message.isUser ? "white" : "#333",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: message.isUser ? "none" : "1px solid #e0e0e0",
                whiteSpace: "pre-wrap",
                lineHeight: "1.4",
              }}
            >
              {message.text}
              {message.timestamp && (
                <div
                  style={{
                    fontSize: "11px",
                    opacity: 0.7,
                    marginTop: "4px",
                    textAlign: message.isUser ? "right" : "left",
                  }}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "18px",
                background: "white",
                border: "1px solid #e0e0e0",
                color: "#666",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #f3f3f3",
                    borderTop: "2px solid #667eea",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                AI думает...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #f0f0f0",
          background: "white",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос о веб-разработке..."
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px",
            }}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: "12px 24px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              opacity: loading || !input.trim() ? 0.6 : 1,
            }}
          >
            {loading ? "⏳" : "📤"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
