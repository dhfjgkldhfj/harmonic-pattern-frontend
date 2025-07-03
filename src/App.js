import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

function App() {
  const [patterns, setPatterns] = useState([]);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1h");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://your-backend-url.onrender.com/patterns?symbol=${symbol}&interval=${interval}`
      );
      setPatterns(response.data.patterns);
    } catch (error) {
      console.error("Error fetching patterns:", error);
    } finally {
      setLoading(false);
    }
  };

  // تبسيط رسم نقاط الأنماط كنموذج
  const plotData = patterns.map((pattern, idx) => ({
    x: Object.values(pattern.points),
    y: Object.values(pattern.points),
    type: "scatter",
    mode: "lines+markers+text",
    text: ["X", "A", "B", "C", "D"],
    textposition: "top center",
    name: pattern.pattern,
    line: { shape: "linear" },
  }));

  return (
    <div style={{ padding: 20 }}>
      <h1>Harmonic Pattern Detection</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          Symbol:{" "}
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
        </label>
        <label style={{ marginLeft: 20 }}>
          Interval:{" "}
          <select value={interval} onChange={(e) => setInterval(e.target.value)}>
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="1d">1 Day</option>
          </select>
        </label>
        <button onClick={fetchPatterns} disabled={loading} style={{ marginLeft: 20 }}>
          {loading ? "Loading..." : "Fetch Patterns"}
        </button>
      </div>

      <Plot
        data={plotData}
        layout={{
          width: 800,
          height: 600,
          title: `Harmonic Patterns for ${symbol} (${interval})`,
          xaxis: { title: "Index" },
          yaxis: { title: "Price" },
        }}
      />
    </div>
  );
}

export default App;
