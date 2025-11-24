"use client";

import { useState } from "react";

export default function ChatTest() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<{ question: string; answer: string }>
  >([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
      setHistory((prev) => [
        ...prev,
        {
          question: message,
          answer: data.response,
        },
      ]);
    } catch (error) {
      setResponse("❌ Ошибка соединения с API");
    }
    setLoading(false);
    setMessage("");
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
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "24px",
        margin: "20px 0",
        background: "#fafafa",
        maxWidth: "800px",
      }}
    >
      <h3 style={{ marginTop: 0, color: "#1976d2" }}>
        🧠 AI Tutor - Демо режим
      </h3>

      {/* Быстрые вопросы */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
          Быстрые вопросы:
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setMessage(q)}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                border: "1px solid #1976d2",
                background: "transparent",
                color: "#1976d2",
                borderRadius: "16px",
                cursor: "pointer",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Поле ввода */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Задайте вопрос о веб-разработке..."
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "14px",
          }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          style={{
            padding: "12px 24px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            opacity: loading || !message.trim() ? 0.6 : 1,
          }}
        >
          {loading ? "⏳" : "📤"}
        </button>
      </div>

      {/* Ответ */}
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "white",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {response}
          </div>
        </div>
      )}

      {/* История */}
      {history.length > 0 && (
        <details style={{ marginTop: "20px" }}>
          <summary style={{ cursor: "pointer", color: "#666" }}>
            📝 История диалога ({history.length})
          </summary>
          <div style={{ marginTop: "10px" }}>
            {history
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "16px",
                    padding: "12px",
                    background: "white",
                    borderRadius: "8px",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div style={{ fontWeight: "bold", color: "#1976d2" }}>
                    ❓ {item.question}
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      whiteSpace: "pre-wrap",
                      fontSize: "13px",
                    }}
                  >
                    {item.answer.split("\n").slice(0, 3).join("\n")}...
                  </div>
                </div>
              ))}
          </div>
        </details>
      )}
    </div>
  );
}
