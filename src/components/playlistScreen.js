import { useState, useEffect } from "react";
import { musicIDs } from "../page/Home";
import "./playlistScreen.css";

const PlaylistScreen = ({ id, musicId, setMusicId }) => {
  const [playlist, setPlaylist] = useState(null);
  const [playlistDetail, setPlaylistDetail] = useState([]);
  const token = sessionStorage.getItem("spotifyAccessToken") || "";

  useEffect(() => {
    if (id !== "") {
      (async () => {
        //プレイリストの情報の取得
        const request = await fetch(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          }
        );
        const responce = await request.json();
        setPlaylist(responce);

        //曲の取得
        const requestItems = await fetch(
          `https://api.spotify.com/v1/playlists/${id}/tracks`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          }
        );
        const responceItems = await requestItems.json();
        setPlaylistDetail(responceItems);
      })();
    }
  }, [id]);

  return (
    <div>
      <div className={playlist ? "playlist-name-group" : ""}>
        <img className="playlist-img" src={playlist?.images[0].url} />
        <div className="playlist-name">{playlist?.name}</div>
      </div>

      <div>
        {playlistDetail.items?.map((item) => {
          return (
            <div
              key={item.track.id}
              className={item.track.id === musicId ? "selected-item" : "item"}
              onClick={() => {
                setMusicId(item.track.id);
              }}
            >
              {item.track.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistScreen;
