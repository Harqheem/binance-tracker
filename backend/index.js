const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Allow all origins (can restrict to your Fly.io domain later)
app.use(cors());

app.get('/api/v1/coins', (req, res) => {
  res.json({
    "BTCUSDT": { lastClose: 115968.56, ema7: 115799.72, ema25: 115667.38 },
    "ETHUSDT": { lastClose: 1865.2, ema7: 1840.5, ema25: 1820.3 }
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
