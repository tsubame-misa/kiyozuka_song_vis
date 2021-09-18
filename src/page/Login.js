import { useEffect, useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  //const [token, setToken] = useState("");
  const token = sessionStorage.getItem("spotifyAccessToken") || "";

  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  const params = new URLSearchParams();
  params.append("client_id", process.env.REACT_APP_CLIENTID);
  params.append("response_type", "code");
  params.append(
    "redirect_uri",
    process.env.RETURN_TO || "http://localhost:3000/api/auth/authorize"
  );
  params.append("scope", scopes.join(" "));
  params.append("state", "state");
  const loginPath = `https://accounts.spotify.com/authorize?${params.toString()}`;

  function login() {
    console.log(loginPath);
    window.location.href = loginPath;
  }

  useEffect(() => {
    (async () => {
      //ユーザーデータの取得
      const request = await fetch(`https://api.spotify.com/v1/me`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      });
      const responce = await request.json();
      setUserData(responce);

      //プレイリストの取得
      const requestPlaylist = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        }
      );
      const responcePlaylist = await requestPlaylist.json();
      setPlaylistData(responcePlaylist);
    })();
  }, []);

  //https://api.spotify.com/v1/playlists/{playlist_id}

  console.log(userData);
  console.log(playlistData);

  if (token === "") {
    return (
      <div>
        <button onClick={login}>Sign in with Spotify</button>
      </div>
    );
  }
  return (
    <div>
      <button>logout</button>
      <div>
        <div>ユーザーネーム：{userData?.display_name}</div>
      </div>
    </div>
  );
};

export default Login;
