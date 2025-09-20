const BACKEND_URL = "https://backend-nameless-tree-1515.fly.dev"; // replace with your Fly.io backend

async function fetchCoins() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/coins`);
    const coins = await res.json();
    const container = document.getElementById("coins");
    container.innerHTML = "";
    for (let coin in coins) {
      const data = coins[coin];
      const div = document.createElement("div");
      div.className = "coin";
      div.innerHTML = `
        <strong>${coin}</strong><br>
        EMA7: ${data.ema7}<br>
        EMA25: ${data.ema25}<br>
        Last Close: ${data.lastClose}
      `;
      container.appendChild(div);
    }
  } catch (error) {
    console.error("Failed to fetch coins:", error);
  }
}

fetchCoins();
setInterval(fetchCoins, 10000);
