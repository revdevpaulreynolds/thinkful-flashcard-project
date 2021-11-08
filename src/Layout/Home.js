import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Decks from "./Decks"

export default function Home() {
    return (
        <>
            <Link to="/create-deck">
                <button class="btn btn-secondary mb-3">
                    <h4>
                        <span className="oi oi-plus align-middle mr-2"></span>
                        Create Deck
                    </h4>
                </button>
            </Link>
            <Decks />
        </>
    );
    
}

