import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Отправляем запрос к локальному Ollama API
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama2", // или 'mistral' или другая модель
        prompt: `Ты полезный AI-наставник по программированию. Отвечай на русском языке.
        
Вопрос: ${message}

Ответ:`,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
    }

    const data = await ollamaResponse.json();

    return NextResponse.json({
      response: data.response || "Не удалось получить ответ от модели",
      model: data.model,
      status: "success",
    });
  } catch (error: any) {
    console.error("Ollama API error:", error);

    // Если Ollama не запущен, предлагаем инструкции
    if (
      error.message?.includes("fetch failed") ||
      error.message?.includes("ECONNREFUSED")
    ) {
      return NextResponse.json(
        {
          response: "⚠️ Ollama не запущен. Запусти: `ollama serve`",
          error: "Ollama not running",
          instructions:
            "1) Установи Ollama 2) Запусти: `ollama serve` 3) Скачай модель: `ollama pull llama2`",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Ошибка при обращении к Ollama: " + error.message },
      { status: 500 }
    );
  }
}
