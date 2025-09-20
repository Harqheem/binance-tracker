const express = require('express');
const axios = require('axios');
const ti = require('technicalindicators');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 8000;

// List of coins
const coins = ['SOLUSDT','BTCUSDT','USDTUSDT','XRPUSDT','WIFUSDT','ENAUSDT','WLDUSDT','XAIUSDT','TONUSDT','LDOUSDT'];

// Fetch OHLCV from Binance with timeout
async function fetchOHLCV(symbol, interval='15m', limit=100) {
  try {
    const res = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
      { timeout: 5000 } // 5 seconds timeout
    );
    return res.data.map(c => ({
      open: parseFloat(c[1]),
      high: parseFloat(c[2]),
      low: parseFloat(c[3]),
      close: parseFloat(c[4]),
      volume: parseFloat(c[5]),
      timestamp: c[0]
    }));
  } catch (err) {
    console.error(`Error fetching ${symbol}:`, err.message);
    return [];
  }
}

// Compute indicators safely
function computeIndicators(data) {
  const close = data.map(d => d.close);
  const high = data.map(d => d.high);
  const low = data.map(d => d.low);
  const volume = data.map(d => d.volume);

  const ema7 = ti.EMA.calculate({ period: 7, values: close }).slice(-1)[0];
  const ema25 = ti.EMA.calculate({ period: 25, values: close }).slice(-1)[0];
  const ema99 = ti.EMA.calculate({ period: 99, values: close }).slice(-1)[0];
  const atr14 = ti.ATR.calculate({ period: 14, high, low, close }).slice(-1)[0];

  const bb = ti.BollingerBands.calculate({ period: 20, stdDev: 2, values: close }).slice(-1)[0];

  return {
    ema7, ema25, ema99,
    atr14,
    bbUpper: bb?.upper,
    bbMiddle: bb?.middle,
    bbLower: bb?.lower,
    lastClose: close[close.length-1],
    lastCandle: data[data.length-1],
    lastVolumes: volume.slice(-5)
  };
}

// API endpoint
app.get('/api/v1/coins', async (req, res) => {
  const results = {};

  await Promise.all(coins.map(async coin => {
    const data = await fetchOHLCV(coin);
    if (data.length === 0) {
      results[coin] = { error: 'Failed to fetch data' };
    } else {
      results[coin] = computeIndicators(data);
    }
  }));

  res.json(results);
});

// Start server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
