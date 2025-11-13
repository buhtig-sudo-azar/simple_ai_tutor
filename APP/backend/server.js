const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors({
    origin: ['https://bug-free-palm-tree-69vq4xw7q7j9256xg-5000.app.github.dev']
    ,
    credentials: true
}));
app.use(express.json())

app.get("/api/test", function (req, res) {
    res.send({ message: "Сервер работает!" })
    
});

app.post("/api/analyze", function (req, res) {
    if (!req.body.text) return res.sendStatus(400)
    console.log(req.body.text)
    res.json({ result: `AI анализ ${req.body.text}` })
});

const port = 5000;
app.listen(port, () => console.log(`Server is running http://localhost:${port}`))