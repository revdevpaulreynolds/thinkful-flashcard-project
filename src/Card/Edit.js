import { updateCard, readCard, readDeck } from "../utils/api";
import { useHistory, useParams, Link } from "react-router-dom";
import React, {useEffect, useState} from "react"
import CardForm from "./Form";

function CardEdit({ title }) {
    const { cardId, deckId } = useParams();
    const history = useHistory();
    
    const [card, setCard] = useState({ front: "", back: "" });
    const [deck, setDeck] = useState({ cards: [] });

    useEffect(() => {
        readDeck(deckId).then(setDeck);
        readCard(cardId).then(setCard);
    }, [deckId, cardId])

    function submitHandler(card) {
        console.log(`card: ${JSON.stringify(card)}`)
        updateCard(card).then(doneHandler);
    }

    function doneHandler() {
        history.push(`/decks/${deck.id}`)
    }
    console.log("card: ", card);
    const editCurrentCard = card.id ? (
        <CardForm 
            onSubmit={submitHandler}
            onDone={doneHandler}
            initialState={card}
            deckName={deck.name}
            doneBtnLabel="Cancel"
            title="Edit"
            // utility='Edit'
        />
    ) : (
        <p>Loading...</p>
    )

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
                        <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            {editCurrentCard}
        </div> 
    )
}

export default CardEdit;