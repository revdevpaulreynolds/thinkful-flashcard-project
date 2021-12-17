import React, {useEffect, useState} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function DeckEdit() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId]);

    function submitHandler(deck) {
        updateDeck(deck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`))
    }

    function cancel() {
        history.goBack();
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                    <span className="oi oi-home" /> Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>
                        {deck.name}
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Update Deck
                </li>
                </ol>
            </nav>
            <h1>Update Deck</h1>
            <DeckForm onCancel={cancel} onSubmit={submitHandler} />
        </div>
    )
}
export default DeckEdit;