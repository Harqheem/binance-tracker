const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/v1/coins', (req, res) => {
  res.json({ test: 'server is running' });
});

// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

