function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>✅ Netlify Test Successful!</h1>
      <p>If you see this, React is working on Netlify!</p>
      <button 
        onClick={() => alert('Everything works!')}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Click Me
      </button>
    </div>
  )
}

export default App