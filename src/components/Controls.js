import React from "react";
import axios from "axios";

export default function PatternControls({ symbol, interval, setSymbol, setInterval, setPatterns, setLoading }) {
  const fetchPatterns = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://your-backend-url.onrender.com/patterns?symbol=${symbol}&interval=${interval}`
      );
      setPatterns(response.data.patterns);
    } catch (error) {
      console.error("Error fetching patterns:", error);
      setPatterns([]);
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <button onClick={fetchPatterns} style={{ marginLeft: 20 }}>
        Fetch Patterns
      </button>
    </div>
  );
}
