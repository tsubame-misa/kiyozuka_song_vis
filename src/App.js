import { useEffect, useState } from "react";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    (async () => {
      const request = await fetch("baby_got_bless_you.json");
      const musicData = await request.json();
      setData(musicData.segments);

      console.log(musicData);

      const request2 = await fetch("for_tomorrrow.json");
      const musicData2 = await request2.json();
      setData2(musicData2.segments);
    })();
  }, []);
  console.log(data);
  console.log(data2);

  var scale = d3.scaleLinear().domain([0, 5]).range(["#fff8dd", "#EDAD0B"]);
  const len = 10;
  return (
    <div>
      <div>
        <svg style={{ width: "1000px", height: "1000px" }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            return data.map((d, j) => {
              return (
                <rect
                  x={len * j}
                  y={len * i}
                  width={len}
                  height={len}
                  //fill={scale(d.pitches[i])}
                  fill={d3.interpolateTurbo(d.pitches[i])}
                  // key={i * segment.pitches.length + j}
                />
              );
            });
          })}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            return data2.map((d, j) => {
              return (
                <rect
                  x={len * j}
                  y={200 + len * i}
                  width={len}
                  height={len}
                  //fill={scale(d.pitches[i])}
                  fill={d3.interpolateTurbo(d.pitches[i])}
                  // key={i * segment.pitches.length + j}
                />
              );
            });
          })}
        </svg>
      </div>
    </div>
  );
}

export default App;
