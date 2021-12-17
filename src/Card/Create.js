import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./Form";

function CardCreate() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({cards: []});

    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId])

    async function submitHandler(card) {
        await createCard(deckId, card);
        history.push(`/decks/${deckId}`);
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
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Add Card
                </li>
                </ol>
            </nav>
            <CardForm 
                deckId={deckId}
                deckName={deck.name}
                initialState={{front: "", back: ""}}
                onSubmit={submitHandler} 
                // onDone={doneHandler}
                title="Add"
                // utility='Add'
            />
        </div>
    )
}
export default CardCreate;