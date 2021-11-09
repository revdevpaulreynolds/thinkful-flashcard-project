import React, {useState, useEffect} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";
import StudyPage from "./StudyPage";
import NotEnough from "./NotEnough";

export default function Study() {
    const [deck, setDeck] = useState({ cards: [] })
    const {deckId} = useParams()
    // const [currentCard, setCurrentCard] = useState()

    const history = useHistory();
    const [cardNumber, setCardNumber] = useState(1);
    // teddy
    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId]);
    const cardCount = deck.cards.length;
    const nextCardHandler = () => {
        if(cardNumber === cardCount) {
            const returnToHomePage = !window.confirm(
                "Restart cards?\n\nClick 'cancel' to return to the home page."
            );
            return returnToHomePage ? history.push("/") : setCardNumber(1)
        }
        setCardNumber((prevState) => Math.min(cardCount, prevState + 1))
    }

    const cardTitle = `Card ${cardNumber} of ${cardCount}`
    const card = deck.cards[cardNumber - 1];
    if(cardCount <= 2) {
        return (
            <StudyCard name={deck.name} deckId={deckId}>
                <NotEnough deckId={deckId} cardCount={cardCount} />
            </StudyCard>
        )
    }
    
    return (
        <StudyPage name={deck.name} deckId={deckId}>
            <StudyCard card={card} title={cardTitle}>
                <button type="button" className="btn btn-primary" onClick={nextCardHandler}>
                    Next
                </button>
            </StudyCard>
        </StudyPage>
    );
}

// useEffect(loadDeck, [deckId])
// function loadDeck() {
//     readDeck(deckId).then(setDeck)
//     .then(setCurrentCard(deck.cards[0])
// )}
// function changeCard() {
//     // id = currentCard.id
//     setCurrentCard(deck.cards.filter(card => card.id === currentCard.id + 1));
// }