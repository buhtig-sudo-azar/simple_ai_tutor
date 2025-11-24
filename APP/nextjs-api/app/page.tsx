import ChatTest from "./components/ChatTest";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 AI Tutor Backend</h1>
      <p>Next.js API успешно запущен!</p>
      <p>Порт: 3000</p>

      {/* Добавляем наш тестовый компонент */}
      <ChatTest />
    </div>
  );
}
