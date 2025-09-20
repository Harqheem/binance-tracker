const express = require('express');
const app = express();

// If you have CORS requests from frontend
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

// Example API endpoint
app.get('/api/v1/coins', (req, res) => {
  res.json({
    BTCUSDT: {
      ema7: 115799.73,
      ema25: 115667.38,
      ema99: 115892.65,
      lastClose: 115968.56
    },
    SOLUSDT: {
      ema7: 239.37,
      ema25: 238.94,
      ema99: 239.51,
      lastClose: 239.78
    }
  });
});

// Default root route
app.get('/', (req, res) => {
  res.send('Hello! Backend is running on Fly.io');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
