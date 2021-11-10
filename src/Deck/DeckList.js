import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api";
// import DeckCard from "./DeckCard"

export default function Decks() {
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        const ac = new AbortController();
        async function getDecks() {
            try {
                const myDecks = await listDecks();
                setDecks(myDecks);
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                } else {
                    throw error;
                }
            }
        }
        getDecks();
        return () => ac.abort();
    }, [])

    function deleteThisDeck(deckId) {
        const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        if (result) {
            deleteDeck(deckId).then(() => {
                const myDecks = listDecks();
                setDecks(myDecks);
            }
               
            );
        }
    }

    const list = decks.map((deck) => (
        // <DeckCard thisDeck={deck} deleteThisDeck={deleteThisDeck} />
        <li className="card" key={deck.id}>
            <div className="card-body">
                <span>
                <h4 className="card-title">
                    {deck.name}
                    <div className="float-right small">
                    {deck.cards.length + " cards in deck"}
                    </div>
                </h4>
                
                </span>
                <div>
                    {deck.description}
                </div>
                {/* Bring to Deck screen */}
                <Link to={`/decks/${deck.id}`}>
                <button href="#" type="button" className="btn btn-secondary mr-2 btn-md">
                    <span className="oi oi-eye mr-1"></span>
                    View
                </button>
                </Link>
                {/* Bring to Study screen */}
                <Link to={`/decks/${deck.id}/study`}>
                <button type="button" className="btn btn-primary btn-md">
                    <span className="oi oi-book mr-1"></span>
                    Study
                </button>
                </Link>
                {/* make warning message with OK or cancel */}
                <button onClick={() => deleteThisDeck(deck.id)} type="button" className="btn btn-danger float-right">
                    <span className="oi oi-trash"></span>
                </button>
            </div>
        </li>
        )
    )

    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">
                <span className="oi oi-plus" /> Create Deck
            </Link>
            <ul className="list-group mt-2 deck-list">{list}</ul>
        </div>
    )
}