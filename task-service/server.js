const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002; // แก้เป็น 3001, 3002, 3003 ตามแต่ละ service

app.get('/', (req, res) => {
  res.send(`Service is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});