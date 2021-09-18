import { useEffect, useState } from "react";
import * as d3 from "d3";
import "./style.css";
import request from "request";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/*import Header from "./components/Header";
import Home from "./page/Home";
import Recipe from "./page/Recipe";
import Footer from "./components/Footer";*/
import View from "./page/View";
import Home from "./page/Home";
import Header from "./components/header";
import Login from "./page/Login";
import Sample from "./page/Sample";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <section
          className="section bg-black"
          style={{ paddingTop: "24px", paddingBottom: "24px" }}
        >
          <div className="container">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/api/auth/authorize" exact>
                <Sample />
              </Route>
              <Route path="/view/:name" exact>
                <View />
              </Route>
            </Switch>
          </div>
        </section>
        {/*} <Footer />*/}
      </div>
    </Router>
  );
}

export default App;
