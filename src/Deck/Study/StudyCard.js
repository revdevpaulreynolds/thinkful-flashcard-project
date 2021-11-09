import React, { useEffect, useState } from "react"

const nextView = {
    front: "back",
    back: "front",
}

export default function StudyCard({ card = {}, title, children}) {
    const [side, setSide] = useState('front');
    const [flipped, setFlipped] = useState(false);

    function changeSide() {
        // side === 'front' ? setSide('back') : setSide('front');
        setSide((prevState) => nextView[prevState]);
        setFlipped(true);
    }
    useEffect(() => {
        setSide("front");
        setFlipped(false);
    }, [card])

    return (
        <div className={`card ${side} study-card`}>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">
                    {/* {side === 'front' ? currentCard.front : currentCard.back} */}
                    {card[side]}
                </p>
                <button
                    type="button"
                    className="btn btn-secondary" 
                    onClick={changeSide}
                >
                    Flip
                </button>
                {flipped && children}
            </div>
        </div>
    )
}