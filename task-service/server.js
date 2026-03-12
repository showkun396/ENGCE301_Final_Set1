const express = require('express');
const app = express();
app.use(express.json());

// ดึงพอร์ตจาก Environment Variable (ที่เซตไว้ใน .yml) ถ้าไม่มีให้ใช้ 3002
const PORT = process.env.PORT || 3002;

const taskRoutes = require('./src/routes/tasks');
const { pool } = require('./src/db/db');

app.use('/api/tasks', taskRoutes);

// Wait for DB and start server
async function start() {
    let retries = 10;
    while (retries > 0) {
        try { await pool.query('SELECT 1'); break; }
        catch (e) {
            console.log(`[task-service] Waiting for DB... (${retries} left)`);
            retries--;
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Task Service is up on port ${PORT}`);
    });
}
start();