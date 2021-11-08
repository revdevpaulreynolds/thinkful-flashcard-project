import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api";

export default function Decks() {
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        const ac = new AbortController();
        async function getDecks() {
            try{
                const myDecks = await listDecks();
                setDecks(myDecks);
            } catch (error) {
                if (error.name === "AbortError") {

                } else {
                    throw error;
                }
            }
        }
        getDecks();
        return () => ac.abort();
    }, [])

    async function deleteThisDeck(deckId) {
        const result = window.confirm("Delete this deck? You will not be able to recover it.")
        if (result) {
            await deleteDeck(deckId);
        }
    }

    return (
        <>
            {decks.map((deck) => (
                <div className="card mb-3" deckId={deck.id}>
                    <div className="card-body">
                        <span>
                        <h3 className="card-title">
                            {deck.name}
                        </h3>
                        <h5 className="card-subtitle">
                            {deck.cards.length + " cards in deck"}
                        </h5>
                        </span>
                        <div>
                            {deck.description}
                        </div>
                        {/* Bring to Deck screen */}
                        <button href="#" type="button" className="btn btn-secondary mr-2 btn-md">
                            <span className="oi oi-eye mr-1"></span>
                            View
                        </button>
                        {/* Bring to Study screen */}
                        <Link to="/decks/{deck.id}/study">
                        <button type="button" className="btn btn-primary btn-md">
                            <span className="oi oi-book mr-1"></span>
                            Study
                        </button>
                        </Link>
                        {/* make warning message with OK or cancel */}
                        <button onClick={deleteThisDeck(deck.id)} type="button" className="btn btn-danger float-right">
                            <span className="oi oi-trash"></span>
                        </button>
                    </div>
                    
                </div>
                )
            )}
        </>
    )
}