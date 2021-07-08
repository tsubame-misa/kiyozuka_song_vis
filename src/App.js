import { useEffect, useState } from "react";
import * as d3 from "d3";

function HorizontalAxis({ len, term, name, w }) {
  return (
    <g>
      <text
        transform={`translate(${w / 2} -40)`}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        style={{ userSelect: "none" }}
      >
        {name}
      </text>
      {term.map((t, i) => {
        if (i % 50 === 0) {
          return (
            <g
              transform={`translate(${len * i + len}, -20) rotate(-45)`}
              key={i}
            >
              <text
                x="0"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="8"
                style={{ userSelect: "none" }}
                key={i}
              >
                {Math.round(t.start)}
              </text>
            </g>
          );
        }
      })}
    </g>
  );
}

function App() {
  const [song, setSong] = useState("baby_got_bless_you.json");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const request = await fetch(song);
      const musicData = await request.json();
      const sectionData = await musicData.sections;
      const Data = musicData.segments;
      for (let s = 1; s < sectionData.length; s++) {
        for (let d of Data) {
          if (
            sectionData[s - 1].start < d.start &&
            d.start < sectionData[s].start
          ) {
            d["key"] = sectionData[s].key;
          } else if (d.start > sectionData[sectionData.length - 1].start) {
            d["key"] = sectionData[s - 1].key;
          }
        }
      }
      setData(Data);
    })();
  }, [song]);
  console.log(data);

  function coloJudge(key, pitch) {
    const hue = [
      "#FF0000",
      "#FF7F00",
      "#FF7F00",
      "#FF7F00",
      "#00FF00",
      "#00FF7F",
      "#00FFFF",
      "#007FFF",
      "#0000FF",
      "#7F00FF",
      "#FF00FF",
      "#FF007F",
    ];
    const colorScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range(["#FFFFFF", hue[key]]);

    const color = colorScale(pitch);
    //console.log(color, key, pitch);
    return color;
  }

  //var scale = d3.scaleLinear().domain([0, 5]).range(["#FFFFFF", "#0C060F"]);
  const margin = {
    left: 10,
    right: 30,
    top: 45,
    bottom: 10,
  };
  const contentWidth = 1600;
  const contentHeight = 100;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  const len = 8;
  return (
    <div>
      <select
        onChange={(e) => {
          setSong(e.target.value);
        }}
      >
        <option value="baby_got_bless_you.json">Baby god bless you</option>
        <option value="for_tomorrrow.json">For Tomorrow</option>
      </select>
      {[200, 400, 600, 800, Math.min(data.length, 10000)].map((time) => {
        return (
          <div>
            <svg
              viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
            >
              <HorizontalAxis
                len={len}
                term={data.slice(time - 200, time)}
                name={""}
                w={1000}
              />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                return data.slice(time - 200, time).map((d, j) => {
                  return (
                    <rect
                      x={len * j}
                      y={len * i}
                      width={len}
                      height={len}
                      fill={coloJudge(d.key, d.pitches[i])}
                      key={i * data.slice(time - 200, time).length + j}
                    />
                  );
                });
              })}
            </svg>
          </div>
        );
      })}
    </div>
  );
}

export default App;
