import { useEffect, useState } from "react";
import * as d3 from "d3";

function VerticalAxis({ scale, strokeColor, name, len }) {
  const x = 0;
  const [y1, y2] = scale.range();
  return (
    <g>
      <text
        transform={`rotate(-90)
                translate(${(-1 * len) / 2} -45)
               `}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ userSelect: "none" }}
      >
        {name}
      </text>
      <line x1={x} y={y2} x2={x} y2={y1} stroke={strokeColor}></line>
      {scale.ticks().map((y, i) => {
        return (
          <g transform={`translate(0, ${scale(y)})`} key={i}>
            <line x1="0" x2="-5" stroke={strokeColor} />
            <text
              x="-10"
              textAnchor="end"
              dominantBaseline="central"
              fontSize="12"
              style={{ userSelect: "none" }}
            >
              {y}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HorizontalAxis({ scale, strokeColor, name, len }) {
  const y = len;
  const [x1, x2] = scale.range();
  return (
    <g>
      <text
        x={200}
        y={y + 40}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ userSelect: "none" }}
      >
        {name}
      </text>
      <line x1={x2} y1={y} x2={x1} y2={y} stroke={strokeColor}></line>
      {scale.ticks().map((x, i) => {
        return (
          <g transform={`translate(${scale(x)},${len})`} key={i}>
            <line y1="0" y2="5" stroke={strokeColor} />
            <text
              y="15"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="12"
              style={{ userSelect: "none" }}
            >
              {x}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function App() {
  const margin = {
    left: 60,
    right: 130,
    top: 20,
    bottom: 60,
  };
  const contentWidth = 400;
  const contentHeight = 400;
  const [originData, setOrginData] = useState([]);

  const heatData = [
    [1, 3, 2, 4, 2, 1, 3, 2, 4, 2, 1, 1, 2, 4, 5],
    [1, 1, 2, 4, 5, 2, 3, 3, 5, 4, 2, 3, 3, 5, 4],
    [2, 3, 3, 5, 4, 1, 3, 2, 4, 2, 2, 3, 3, 5, 4],
    [1, 1, 2, 4, 5, 2, 3, 3, 5, 4, 2, 3, 3, 5, 4],
    [1, 1, 2, 4, 5, 2, 3, 3, 5, 4, 2, 3, 3, 5, 4],
    [1, 3, 2, 4, 2, 1, 3, 2, 4, 2, 1, 1, 2, 4, 5],
    [1, 1, 2, 4, 5, 2, 3, 3, 5, 4, 2, 3, 3, 5, 4],
    [2, 3, 3, 5, 4, 1, 3, 2, 4, 2, 2, 3, 3, 5, 4],
    [1, 1, 2, 4, 5, 2, 3, 3, 5, 4, 2, 3, 3, 5, 4],
    [1, 3, 2, 4, 2, 1, 3, 2, 4, 2, 1, 1, 2, 4, 5],
    [1, 1, 2, 4, 5, 2, 3, 3, 5, 4, 2, 3, 3, 5, 4],
    [1, 3, 2, 4, 2, 1, 3, 2, 4, 2, 1, 1, 2, 4, 5],
  ];

  const data = originData.filter((item) => showSpecies[item.species]);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(heatData, (item, i) => i))
    .range([0, contentWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item, j) => item[yProperty]))
    .range([contentHeight, 0])
    .nice();

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  //schemeCategory10 色の割り振りしてくれる便利
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  for (const item of originData) {
    colorScale(item.species);
  }

  var scale = d3.scaleLinear().domain([0, 5]).range(["#fff8dd", "#ffc800"]);

  return (
    <div style={{ width: "700px" }}>
      <h1>scatter</h1>

      <div>
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 1px" }}
        >
          {heatData.map((_, i) => {
            return _.map((item, j) => {
              return (
                <rect
                  x={10 * j}
                  y={10 * i}
                  width="10"
                  height="10"
                  fill={scale(item)}
                />
              );
            });
          })}
        </svg>
      </div>
      {/*} <div>
       
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 1px" }}
        >
          <Legend />
          <VerticalAxis
            scale={yScale}
            strokeColor={strokeColor}
            name={yProperty}
            len={contentWidth}
          />
          <HorizontalAxis
            scale={xScale}
            strokeColor={strokeColor}
            name={xProperty}
            len={contentHeight}
          />
         
          {data.map((item) => {
            return (
              <circle
                key={item.key}
                //cx={xScale(item[xProperty])}
                //cy={yScale(item[yProperty])}
                transform={`translate(${xScale(item[xProperty])},${yScale(
                  item[yProperty]
                )})`}
                r="5"
                fill={colorScale(item.species)}
                style={{ transitionDuration: "1s" }}
              />
            );
          })}
          
        </svg>
        </div>*/}
    </div>
  );
}

export default App;
