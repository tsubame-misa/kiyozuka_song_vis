import { useState, useEffect } from "react";

const PlaylistScreen = ({ id }) => {
  const [playlist, setPlaylist] = useState(null);
  const [playlistDetail, setPlaylistDetail] = useState([]);
  const token = sessionStorage.getItem("spotifyAccessToken") || "";

  useEffect(() => {
    console.log(id);
    if (id !== null) {
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

  console.log(playlist);
  console.log(playlistDetail);

  return (
    <div>
      <div>{playlist?.name}</div>
      <div>
        <img src={playlist?.images[0].url} />
      </div>
      <div>
        {playlistDetail.items?.map((item) => {
          return <div key={item.track.id}>{item.track.name}</div>;
        })}
      </div>
    </div>
  );
};

export default PlaylistScreen;
