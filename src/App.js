import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const request = await fetch("baby_got_bless_you.json");
      const data = await request.json();
      setData(data);
    })();
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
