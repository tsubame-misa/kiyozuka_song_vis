import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="title mb-1">My Favarite Songs Vis</div>
          <div style={{ textAlign: "right" }}>
            <p> 渡邉みさと</p>
            <p>
              使用データ :
              <a
                href="https://developer.spotify.com/documentation/web-api/"
                className="has-text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                &ensp;Spotify API
              </a>
              より
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
