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
                fontSize="8"
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
    //console.log(color, key, pitch);
    return color;
  }

  var scale = d3.scaleLinear().domain([0, 1]).range(["#FFFFFF", "#0C060F"]);
  const margin = {
    left: 10,
    right: 30,
    top: 45,
    bottom: 10,
  };
  const contentWidth = 1600;
  const contentHeight = 200;

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
                    <g>
                      {j !== 0 ? (
                        <g transform={`translate(0, 110) `}>
                          <line
                            x1={len * (j - 1)}
                            y1={
                              -1 *
                              data.slice(time - 200, time)[j - 1].loudness_max
                            }
                            x2={len * j}
                            y2={-1 * d.loudness_max}
                            //stroke={coloJudge(d.key, 1)}
                            stroke="black"
                          />
                          <line
                            x1={len * (j - 1)}
                            y1={60}
                            x2={len * j}
                            y2={60}
                            strokeWidth="0.5px"
                            stroke="black"
                          />
                        </g>
                      ) : (
                        []
                      )}
                      <g transform={`translate(0, 110) `}>
                        <rect
                          x={len * j}
                          y={-20 + len * 0.85 * i}
                          width={len}
                          height={len * 0.85}
                          //fill={coloJudge(d.key, d.pitches[i])}
                          //fill={d3.interpolateTurbo(d.pitches[i])}
                          fill={coloJudge(d.key, 1)}
                          fillOpacity={0.1}
                          key={i * data.slice(time - 200, time).length + j}
                        />
                      </g>
                      <rect
                        x={len * j}
                        y={len * i}
                        width={len}
                        height={len}
                        //fill={coloJudge(d.key, d.pitches[i])}
                        //fill={d3.interpolateTurbo(d.pitches[i])}
                        fill={scale(d.pitches[11 - i])}
                        key={i * data.slice(time - 200, time).length + j}
                      />
                    </g>
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
