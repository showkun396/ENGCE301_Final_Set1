const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3003;

// จำลองการเก็บ Log
let logs = [];

// ด่าน T9: บันทึก Log
app.post('/api/logs', (req, res) => {
    const { action, user } = req.body;
    const newLog = { id: logs.length + 1, action, user, timestamp: new Date() };
    logs.push(newLog);
    console.log("New Log saved:", newLog);
    res.status(201).json({ message: "Log saved", log: newLog });
});

// ด่าน T10: ดู Log ทั้งหมด
app.get('/logs', (req, res) => {
    res.json(logs);
});

app.get('/', (req, res) => res.send(`Log Service is running on port ${PORT}`));

app.listen(PORT, () => console.log(`Log Service is up on port ${PORT}`));