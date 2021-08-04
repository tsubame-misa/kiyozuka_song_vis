function Footer() {
  return (
    <div className="footer py-6" style={{ textAlign: "right" }}>
      {" "}
      <p>My Favarite Songs Vis by 渡邉みさと</p>
      <p>
        使用データ :
        <a
          href="https://developer.spotify.com/documentation/web-api/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &ensp;Spotify API
        </a>
      </p>
    </div>
  );
}

export default Footer;
