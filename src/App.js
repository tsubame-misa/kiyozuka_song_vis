import { useEffect, useState } from "react";
import * as d3 from "d3";
import img from "./icon.png";
import request from "request";

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
                fontSize="20"
                style={{ userSelect: "none" }}
                key={i}
              >
                {Math.floor(Math.floor(t.start) / 60)}:
                {Math.floor(t.start % 60)}
              </text>
            </g>
          );
        }
      })}
    </g>
  );
}

function App() {
  const spotify = {
    ClientId: process.env.REACT_APP_CLIENTID,
    ClientSecret: process.env.REACT_APP_CLIENTSECRET,
  };

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(spotify.ClientId + ":" + spotify.ClientSecret).toString(
          "base64"
        ),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  const [song, setSong] = useState("baby_got_bless_you.json");
  const [data, setData] = useState([]);
  const [bar, setBar] = useState([]);
  const [beats, setBeats] = useState([]);

  useEffect(() => {
    (async () => {
      const request = await fetch(song);
      const musicData = await request.json();
      console.log(musicData);
      const sectionData = await musicData.sections;
      const Data = musicData.segments;
      for (let s = 1; s < sectionData.length; s++) {
        for (let d of Data) {
          if (
            sectionData[s - 1].start <= d.start &&
            d.start < sectionData[s].start
          ) {
            d["key"] = sectionData[s].key;
          } else if (d.start > sectionData[sectionData.length - 1].start) {
            d["key"] = sectionData[s - 1].key;
          }
        }
      }
      setData(Data);
      setBar(musicData.bars);
      setBeats(musicData.beats);

      /*request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200 && data.length > 0) {
          // use the access token to access the Spotify Web API
          var token = body.access_token;
          var options = {
            url: `https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10`,
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          };
          request.get(options, function (error, response, body) {
            setSimilarSongs(body.tracks);
          });
        }
      });*/
    })();
  }, [song]);
  console.log(data);
  console.log(bar);

  function coloJudge(key, pitch) {
    const hue = [
      "#FF0000", //C red
      "#FF7F00", //C# orange
      "#FF7F00", //D yellow
      "#FF7F00", //D# chartreuse
      "#00FF00", //E lime
      "#00FF7F", //F springgreen
      "#00FFFF", //F# cyan
      "#007FFF", //G deepskyblue
      "#0000FF", //G# blue
      "#7F00FF", //A darckviolet
      "#FF00FF", //A# magenta
      "#FF007F", //B Deeppink
    ];
    const colorScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range(["#FFFFFF", hue[key]]);

    const color = colorScale(pitch);
    return color;
  }

  var scale = d3.scaleLinear().domain([0, 1]).range(["#FFFFFF", "#0C060F"]);
  const margin = {
    left: 100,
    right: 100,
    top: 0,
    bottom: 0,
  };
  //曲の長さによって変えないとダメそう
  const contentWidth = 4500;
  const contentHeight = 250;

  const xScale2 = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item.start))
    .range([0, contentWidth])
    .nice();

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  //これも何かしらの計算で出した方がいい
  const scaleSize = 8;

  let w_min = 100000;
  for (let i = 1; i < data.length; i++) {
    const dic = data[i].start - data[i - 1].start;
    if (dic < w_min) {
      w_min = dic;
    }
  }
  //console.log(w_min);

  let p = 0;
  const testArray = [];
  while (p < data[data.length - 1]?.start) {
    testArray.push(p + w_min);
    p += w_min;
  }
  //console.log(testArray);

  let testPadY = 0;
  let testPadX = 0;

  const pt = 20;
  const padding = 10;
  const linePadding = 15;

  const dBScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item.loudness_max))
    .range([2.5, linePadding])
    .nice();

  const AllData = [];
  for (const d of data) {
    d.name = "segment";
    AllData.push(d);
  }
  for (const d of bar) {
    d.name = "bar";
    AllData.push(d);
  }
  for (const d of beats) {
    d.name = "beat";
    AllData.push(d);
  }
  AllData.sort((a, b) => a.start - b.start);
  console.log(AllData);
  return (
    <div /*style={{ width: "100%" }}*/>
      <select
        onChange={(e) => {
          setSong(e.target.value);
        }}
      >
        <option value="baby_got_bless_you.json">Baby god bless you</option>
        <option value="for_tomorrrow.json">For Tomorrow</option>
      </select>

      <div style={{ width: "100%", height: "90vh" }}>
        <svg
          width={svgWidth * 0.3}
          height={3000}
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((idx) => {
            return (
              <g>
                <line
                  x1={padding}
                  y1={pt + linePadding * idx}
                  x2={contentWidth}
                  y2={10 + linePadding * idx}
                  strokeWidth="0.1px"
                  stroke="black"
                />
                {idx === 0 ? (
                  <line
                    x1={0}
                    y1={pt + testPadY}
                    x2={0}
                    y2={pt / 2 + linePadding * 12 + testPadY}
                    strokeWidth="0.3px"
                    stroke="black"
                  />
                ) : (
                  []
                )}
              </g>
            );
          })}
          <g>
            {AllData.map((item) => {
              if (testPadX + xScale2(item.start) * scaleSize > contentWidth) {
                testPadY += 250;
                testPadX -= contentWidth;
                return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((idx) => {
                  return (
                    <g>
                      <line
                        x1={0}
                        y1={pt + linePadding * idx + testPadY}
                        x2={contentWidth}
                        y2={10 + linePadding * idx + testPadY}
                        strokeWidth="0.1px"
                        stroke="black"
                      />
                      {idx === 0 ? (
                        <g>
                          <line
                            x1={0}
                            y1={pt + testPadY}
                            x2={0}
                            y2={pt / 2 + linePadding * 12 + testPadY}
                            strokeWidth="0.3px"
                            stroke="black"
                          />
                          <line
                            x1={contentWidth}
                            y1={pt / 2 + testPadY}
                            x2={contentWidth}
                            y2={pt / 2 + linePadding * 11 + testPadY}
                            strokeWidth="0.3px"
                            stroke="black"
                          />
                        </g>
                      ) : (
                        []
                      )}
                    </g>
                  );
                });
              }
              if (item.name === "beat") {
                return (
                  <g>
                    <line
                      x1={xScale2(item.start) * scaleSize + testPadX}
                      //y1={-pt}
                      y1={pt / 2 + testPadY}
                      x2={xScale2(item.start) * scaleSize + testPadX}
                      //y2={pt * 2 + linePadding * 12}
                      y2={pt + pt / 2 + linePadding * 11 + testPadY}
                      strokeWidth="0.3px"
                      stroke="black"
                    />
                  </g>
                );
              } else if (item.name === "bar") {
                return (
                  <g>
                    <line
                      x1={xScale2(item.start) * scaleSize + testPadX}
                      y1={-pt / 2 + testPadY}
                      x2={xScale2(item.start) * scaleSize + testPadX}
                      y2={(pt * 3) / 2 + linePadding * 12 + testPadY}
                      strokeWidth="1px"
                      //stroke="black"
                      stroke="orange"
                    />
                  </g>
                );
              } else if (item.name === "segment") {
                return item.pitches.map((p, j) => {
                  return (
                    <g>
                      <circle
                        //key={item.start}
                        cx={
                          padding + xScale2(item.start) * scaleSize + testPadX
                        }
                        cy={pt + linePadding * j + testPadY}
                        r={dBScale(item.loudness_max)}
                        //fill={coloJudge(item.key, item.pitches[11 - j])}
                        fill={scale(item.pitches[11 - j])}
                        opacity="0.75"
                        //style={{ transitionDuration: "1s" }}
                      />
                    </g>
                  );
                });
              }
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
