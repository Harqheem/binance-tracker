require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.NGROK_URL || `http://localhost:${PORT}`;

app.get('/', (req, res) => {
  res.send(`Hello, trading server is running at ${BASE_URL}!`);
});

// Example API route
app.get('/api/v1/coins', (req, res) => {
  const data = {
    BTCUSDT: { price: 115968.56, volume: 102.2 },
    ETHUSDT: { price: 3680.21, volume: 520.1 }
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Accessible externally via: ${BASE_URL}`);
});
