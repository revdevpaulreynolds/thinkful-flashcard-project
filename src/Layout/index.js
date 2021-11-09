import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home"
import Study from "../Deck/Study/Study"
import DeckCard from "../Deck/DeckCard";
import DeckCreate from "../Deck/DeckCreate";
// import DeckEdit from "../Deck/DeckEdit";
// import CardEdit from "../Card/Edit"
import CardCreate from "../Card/Create"
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Router>
          <Switch>
            <Route path="/decks/new">
              <DeckCreate />
            </Route>
            <Route path="/decks/:deckId/study">
              <Study />
            </Route>
            {/* <Route path="/decks/:deckId/edit">
              <DeckEdit />
            </Route> */}
            <Route path="/decks/:deckId/cards/new">
              <CardCreate />
            </Route>
            {/* <Route path="/decks/:deckId/cards/:cardId/edit">
              <CardEdit />
            </Route> */}
            <Route exact={true} path="/decks/:deckId">
              <DeckCard />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Layout;