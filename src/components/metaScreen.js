import { useState, useEffect } from "react";
import { keyDict } from "../page/View";
import RaderChart from "./raderChart";
import { Link } from "react-router-dom";

const MetaScreen = ({ id }) => {
  const [meta, setMeta] = useState(null);
  const [feature, setFeature] = useState(null);
  const token = sessionStorage.getItem("spotifyAccessToken") || "";
  useEffect(() => {
    if (id !== "") {
      (async () => {
        //曲情報の取得
        const request = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        });
        const responce = await request.json();
        setMeta(responce);

        //特徴の取得
        const requestFeature = await fetch(
          `https://api.spotify.com/v1/audio-features/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          }
        );
        const responceFeature = await requestFeature.json();
        setFeature(responceFeature);
      })();
    }
  }, [id]);

  if (id === "") {
    return <div></div>;
  }

  return (
    <div>
      <p className="py-1">
        <b>曲名</b>
        <br />
        <a
          href={meta?.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          {meta?.name}
        </a>
      </p>

      <p className="py-1">
        <b>アーティスト</b>
        <br />
        {meta?.artists?.map((item, j) => {
          return (
            <div className="pl-4" key={j}>
              <a
                href={item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                {j !== 0 ? " / " : []}
                {item.name}
              </a>
            </div>
          );
        })}
      </p>

      <p className="pt-3 pb-1">
        <b>テンポ：</b> {Math.round(feature?.tempo)}
      </p>
      <p className="py-1">
        <b>拍子：</b>
        {feature?.time_signature}拍子
      </p>
      <p className="py-1">
        <b>調：</b>
        {keyDict[feature?.key]}
        {feature?.mode == 0 ? "短調" : "長調"}
      </p>
      <div className="m-3" style={{ width: "350px", minWidth: "350px" }}>
        <RaderChart data={feature} />
      </div>
      <div
        className="p-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button className="button">
          <Link to={`/view/${id}`} className="has-text-black">
            曲の詳細を見る
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MetaScreen;
