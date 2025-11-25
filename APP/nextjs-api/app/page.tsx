import AIChat from "./components/AIChat";
import BrowserAI from "./components/BrowserAI";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#2d3748",
              marginBottom: "10px",
            }}
          >
            🚀 AI Tutor Platform
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#4a5568",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Серверный AI + Локальный браузерный AI
          </p>
        </div>
        {/* Browser AI Section */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#2d3748" }}>🌐 Браузерный AI</h2>
            <p style={{ color: "#666" }}>
              Работает полностью локально через умную базу знаний
            </p>
          </div>
          <BrowserAI />
        </div>
        {/* Server AI Section */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#2d3748" }}>☁️ Серверный AI</h2>
            <p style={{ color: "#666" }}>
              Мощные модели через API (готов к интеграции)
            </p>
          </div>
          <AIChat />
        </div>
        Comparison
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ color: "#8B5CF6" }}>🌐 Браузерный AI</h3>
            <ul style={{ color: "#666", lineHeight: "1.6" }}>
              <li>✅ Работает оффлайн</li>
              <li>✅ Конфиденциальность данных</li>
              <li>✅ Мгновенные ответы</li>
              <li>⚠️ Ограниченные возможности</li>
              <li>⚠️ Требует загрузки модели</li>
            </ul>
          </div>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ color: "#667eea" }}>☁️ Серверный AI</h3>
            <ul style={{ color: "#666", lineHeight: "1.6" }}>
              <li>✅ Мощные модели</li>
              <li>✅ Понимание контекста</li>
              <li>✅ Обновления без перезагрузки</li>
              <li>⚠️ Требует интернет</li>
              <li>⚠️ API лимиты и стоимость</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
