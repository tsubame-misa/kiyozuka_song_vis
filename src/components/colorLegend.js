import React from "react";
import * as d3 from "d3";

const colorLegend = () => {
  /*const w = 250;
  let n = 2;

  if (feature === "loudness") {
    n = 1;
  } else if (feature === "tempo") {
    n = 0;
  }

  const aboutColorGradations = [
    [Math.floor(min * Math.pow(10, n)) / Math.pow(10, n), 0],
  ];

  for (let i = 1; i <= 10; i++) {
    const p = (max - min) / 10;
    let value = min + p * i;
    if (i === 10) {
      value = Math.ceil(max * Math.pow(10, n)) / Math.pow(10, n);
    } else {
      value = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    }
    aboutColorGradations.push([value, 0 + (w / 10) * i]);
  }*/

  const scale = d3.scaleLinear().domain([0, 1]).range(["#FFFFFF", "#0C060F"]);

  return (
    <div>
      hello
      <svg viewBox="0 0 265 60" width={w + 20} height="50">
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor={scale(0)} />
            <stop offset="5%" stopColor={scale(0.05)} />
            <stop offset="10%" stopColor={scale(0.1)} />
            <stop offset="15%" stopColor={scale(0.15)} />
            <stop offset="20%" stopColor={scale(0.2)} />
            <stop offset="25%" stopColor={scale(0.25)} />
            <stop offset="30%" stopColor={scale(0.3)} />
            <stop offset="35%" stopColor={scale(0.35)} />
            <stop offset="40%" stopColor={scale(0.4)} />
            <stop offset="45%" stopColor={scale(0.45)} />
            <stop offset="50%" stopColor={scale(0.5)} />
            <stop offset="55%" stopColor={scale(0.55)} />
            <stop offset="60%" stopColor={scale(0.6)} />
            <stop offset="65%" stopColor={scale(0.65)} />
            <stop offset="70%" stopColor={scale(0.7)} />
            <stop offset="75%" stopColor={scale(0.75)} />
            <stop offset="80%" stopColor={scale(0.8)} />
            <stop offset="85%" stopColor={scale(0.85)} />
            <stop offset="90%" stopColor={scale(0.9)} />
            <stop offset="95%" stopColor={scale(0.95)} />
            <stop offset="100%" stopColor={scale(1)} />
          </linearGradient>
        </defs>
        <rect x="0" y="10" width={w} height="20" fill="url('#gradient')" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => {
          return (
            <line
              key={i}
              x1={item[1]}
              y1="30"
              x2={item[1]}
              y2="40"
              stroke="black"
            />
          );
        })}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => {
          return (
            <text key={i} x={item[1]} y="50" fontSize="10" textAnchor="start">
              {i}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default colorLegend;
