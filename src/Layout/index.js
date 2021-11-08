import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import Home from "./Home"
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
          </Route>
          <NotFound />
        </Switch>
        </Router>
      </div>
    </>
  );
}

export default Layout;
