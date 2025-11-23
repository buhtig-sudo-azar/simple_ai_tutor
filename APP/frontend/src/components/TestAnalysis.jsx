import React, { useState } from 'react'

const TestAnalysis = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      setResult(`Ошибка: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>🧪 Тест анализа текста</h3>
      
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст для анализа..."
        rows="3"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      
      <button 
        onClick={handleAnalyze} 
        disabled={loading}
        style={{ marginBottom: '10px' }}
      >
        {loading ? '⏳ Анализируем...' : '🚀 Проанализировать'}
      </button>

      {result && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px' 
        }}>
          <strong>Результат:</strong> {result}
        </div>
      )}
    </div>
  )
}

export default TestAnalysis