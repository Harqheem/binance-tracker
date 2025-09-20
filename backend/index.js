// backend/index.js
const express = require('express');
const app = express();

// Use the port assigned by Fly.io
const PORT = process.env.PORT || 3000;

// Sample coin data
const coins = {
  WIFUSDT: {
    ema7: 0.8978,
    ema25: 0.8966,
    lastClose: 0.9
  },
  BTCUSDT: {
    ema7: 115799.72,
    ema25: 115667.38,
    lastClose: 115968.56
  },
  SOLUSDT: {
    ema7: 239.37,
    ema25: 238.94,
    lastClose: 239.78
  }
};

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, trading backend is running!');
});

app.get('/api/v1/coins', (req, res) => {
  res.json(coins);
});

// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
