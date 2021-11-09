import React from "react";
// import { Link } from "react-router-dom";
import DeckList from "../Deck/DeckList"

export default function Home() {
    return (
        <div className="Home container">
            <DeckList />
        </div>
        // <div>
        //     <Link to="/create-deck">
        //         <button className="btn btn-secondary mb-3">
        //             <h4>
        //                 <span className="oi oi-plus align-middle mr-2"></span>
        //                 Create Deck
        //             </h4>
        //         </button>
        //     </Link>
        //     <DeckList />
        // </div>
    );
}