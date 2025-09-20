const express = require('express');
const app = express();
const PORT = 3000;

// Sample data for testing
const sampleCoins = {
  BTCUSDT: {
    lastClose: 115968.56,
    ema7: 115799.72,
    atr14: 81.95
  },
  SOLUSDT: {
    lastClose: 239.78,
    ema7: 239.38,
    atr14: 0.53
  },
  XRPUSDT: {
    lastClose: 3.0091,
    ema7: 3.0044,
    atr14: 0.0054
  }
};

// Route
app.get('/api/v1/coins', (req, res) => {
  res.json(sampleCoins);
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello, trading server is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
