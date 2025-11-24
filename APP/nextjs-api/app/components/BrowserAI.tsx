"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp?: Date;
};

// Умная база знаний для демо-режима
const smartKnowledgeBase: Record<string, string> = {
  привет: `👋 Привет! Я демо-версия локального AI. 
  
В реальном приложении здесь работал бы Transformers.js с WebAssembly моделями, но в демо-режиме я использую умные ответы из базы знаний.`,

  react: `⚛️ React - JavaScript библиотека для создания пользовательских интерфейсов.

**Основные концепции:**
• Компоненты (функциональные и классовые)
• Хуки (useState, useEffect, useContext)
• Виртуальный DOM
• JSX синтаксис
• Пропсы и состояние

💡 Пример компонента:
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\``,

  "next.js": `🚀 Next.js - React фреймворк для продакшена.

**Ключевые возможности:**
• Серверный рендеринг (SSR)
• Статическая генерация (SSG)
• Файловая маршрутизация (App Router)
• API Routes
• Встроенная оптимизация изображений

📁 App Router структура:
\`\`\`
app/
  page.tsx           → /
  about/
    page.tsx         → /about
  api/
    chat/
      route.ts       → /api/chat
  layout.tsx         → Общий layout
\`\`\``,

  javascript: `📜 JavaScript - язык веб-разработки.

**Современные возможности ES6+:**
• let/const вместо var
• Стрелочные функции
• Деструктуризация
• Шаблонные строки
• Async/await
• Модули (import/export)

💡 Пример async/await:
\`\`\`javascript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\``,

  typescript: `🛡️ TypeScript - JavaScript с системой типов.

**Преимущества:**
• Обнаружение ошибок на этапе разработки
• Улучшенное автодополнение
• Самодокументируемый код
• Безопасный рефакторинг

💡 Пример интерфейса:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

const createUser = (user: User): User => {
  return { ...user, id: Date.now() };
};
\`\`\``,

  "transformers.js": `🤖 Transformers.js - запуск AI моделей в браузере.

**Как работает:**
• WebAssembly компиляция моделей
• Кэширование в IndexedDB
• Полная работа оффлайн
• Поддержка Hugging Face моделей

⚠️ В демо-режиме используется база знаний, но в продакшене можно подключить настоящие модели!`,

  webassembly: `⚡ WebAssembly - низкоуровневый байткод для веба.

**Преимущества:**
• Нативная производительность
• Поддерка множества языков
• Безопасная sandboxed среда
• Идеален для вычислений

🎯 Отлично подходит для:
• AI/ML модели в браузере
• Обработка изображений/видео
• Научные вычисления
• Игры и графика`,

  "node.js": `🟢 Node.js - JavaScript на сервере.

**Особенности архитектуры:**
• Событийно-ориентированная
• Неблокирующий I/O
• Однопоточная модель с event loop
• Огромная экосистема npm`,

  docker: `🐳 Docker - контейнеризация приложений.

**Ключевые концепции:**
• Образы (Images)
• Контейнеры (Containers) 
• Dockerfile
• Docker Compose
• Volumes

💡 Пример Dockerfile:
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\``,

  api: `🌐 API - интерфейс взаимодействия программ.

**REST принципы:**
• HTTP методы: GET, POST, PUT, DELETE
• Статус коды: 200, 400, 404, 500
• JSON формат данных
• Stateless (без состояния)

🔐 Best Practices:
• Валидация входных данных
• Обработка ошибок
• Пагинация
• Rate limiting
• Документация (OpenAPI)`,
};

export default function BrowserAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Добавляем начальное сообщение только на клиенте
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "🤖 Привет! Я демо-версия локального AI.\n\nВ реальном приложении здесь работал бы Transformers.js с WebAssembly, но пока я использую умную базу знаний. Спроси меня о веб-разработке! 🚀",
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

  // Умный поиск ответа в базе знаний
  const findSmartResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Ищем точные совпадения
    for (const [keyword, answer] of Object.entries(smartKnowledgeBase)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }

    // Умные fallback ответы
    const fallbackResponses = [
      `🤔 "${question}" - интересный вопрос!\n\nВ демо-режиме я специализируюсь на веб-разработке. Попробуй спросить о:\n• React компонентах и хуках\n• Next.js маршрутизации\n• JavaScript асинхронности\n• TypeScript типах\n• Docker контейнеризации`,

      `🎯 Изучаю ваш вопрос: "${question}"\n\n💡 Я могу подробно объяснить:\n• Архитектуру React приложений\n• Преимущества SSR в Next.js\n• Modern JavaScript фичи\n• REST API дизайн\n• Базы данных и ORM`,

      `🚀 "${question}"?\n\nОтличная тема для обсуждения! В реальном AI это обрабатывалось бы нейросетью, но в демо-режиме я использую curated знания о веб-разработке.`,

      `📚 Демо-режим AI Tutor\n\nВаш вопрос: "${question}"\n\n🔧 Моя экспертиза:\n• Frontend: React, Next.js, TypeScript\n• Backend: Node.js, API design\n• DevOps: Docker, Git, CI/CD\n• Tools: VS Code, Chrome DevTools`,
    ];

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

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

    // Имитируем задержку AI обработки
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    try {
      const aiResponse = findSmartResponse(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "❌ Ошибка обработки запроса",
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
    "Расскажи о Docker",
    "Что такое WebAssembly?",
    "Как создать API?",
    "Что такое Transformers.js?",
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
          background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>🧠 Browser AI Demo</h1>
        <p style={{ margin: "5px 0 0 0", opacity: 0.9 }}>
          Умная база знаний (Transformers.js в демо-режиме)
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
          Быстрые вопросы:
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {quickQuestions.map((question, i) => (
            <button
              key={i}
              onClick={() => setInput(question)}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                border: "1px solid #8B5CF6",
                background: "transparent",
                color: "#8B5CF6",
                borderRadius: "16px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8B5CF6";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#8B5CF6";
              }}
            >
              {question}
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
                background: message.isUser ? "#8B5CF6" : "white",
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
                  {!message.isUser && " • 🧠 Умная база знаний"}
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
                    borderTop: "2px solid #8B5CF6",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                AI обрабатывает запрос...
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
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос о веб-разработке..."
            style={{
              flex: 1,
              minHeight: "60px",
              maxHeight: "120px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px",
              resize: "none",
              fontFamily: "inherit",
            }}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: "12px 20px",
              background: "#8B5CF6",
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

        {/* Demo Info */}
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            marginTop: "12px",
            padding: "8px",
            background: "#f8f9fa",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          🎯 <strong>Демо-режим</strong> • 📚 <strong>Умная база знаний</strong>{" "}
          • 🚀 <strong>Готов к AI интеграции</strong>
          <br />
          💡 В продакшене можно подключить Transformers.js или облачные AI API!
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
