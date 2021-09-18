import { useEffect, useState } from "react";

const Sample = ({ history }) => {
  const code = new URL(window.location).searchParams.get("code") ?? "";
  const [token, setToken] = useState("");

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.REACT_APP_RETURN_TO);

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `https://accounts.spotify.com/api/token?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.REACT_APP_CLIENTID}:${process.env.REACT_APP_CLIENTSECRET}`,

              "utf-8"
            ).toString("base64")}`,
          },
        }
      );
      const responce = await request.json();
      setToken(responce);
      if (request.status === 200) {
        sessionStorage.setItem("spotifyAccessToken", responce.access_token);
        sessionStorage.setItem("spotifyRefreshToken", responce.refresh_token);
        history.push("/");
      }
    })();
  }, []);

  return <div>login...</div>;
};

export default Sample;
