const express = require('express');
const app = express();
app.use(express.json());

const SERVICE_NAME = "Auth Service"; // เปลี่ยนตามชื่อ Service
const PORT = 3001; // เปลี่ยนเป็น 3001, 3002, 3003 ตามลำดับ

app.get('/', (req, res) => res.send(`${SERVICE_NAME} is working!`));

const authRoutes = require('./src/routes/auth');
const { pool } = require('./src/db/db');

app.use('/api/auth', authRoutes);

// Wait for DB and start server
async function start() {
    let retries = 10;
    while (retries > 0) {
        try { await pool.query('SELECT 1'); break; }
        catch (e) {
            console.log(`[auth-service] Waiting for DB... (${retries} left)`);
            retries--;
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    app.listen(PORT, '0.0.0.0', () => console.log(`${SERVICE_NAME} on port ${PORT}`));
}
start();