import React from "react";
import Plot from "react-plotly.js";

export default function PatternChart({ patterns, loading, symbol, interval }) {
  if (loading) return <p>Loading patterns...</p>;

  if (!patterns || patterns.length === 0) return <p>No patterns detected.</p>;

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
  );
}
