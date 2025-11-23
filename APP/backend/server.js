const express = require("express")
const cors = require("cors")
const app = express();


app.use(cors({
  origin: [
    'http://localhost:3000', // react 
    'http://localhost:5173', // vite 
    'https://bug-free-palm-tree-69vq4xw7q7j9256xg-5173.app.github.dev' // фронтенд
  ],
  credentials: true
}));
app.use(express.json())




app.get("/api/test", function (req, res) {
    res.send({ message: "Сервер работает!" })
    
});
// server.js - ДОБАВЬ ПЕРЕД /api/analyze:
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend is running!', 
    timestamp: new Date().toISOString(),
    endpoints: ['/api/test', '/api/analyze']
  });
});
app.post("/api/analyze", function (req, res) {
    if (!req.body.text) return res.sendStatus(400)
    console.log(req.body.text)
    res.json({ result: `AI анализ ${req.body.text}` })
});

const port = 5000;
app.listen(port, () => console.log(`Server is running http://localhost:${port}`))