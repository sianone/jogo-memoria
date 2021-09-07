import { useState, useEffect } from "react";


const Board = () => {
  const [deck, setDeck] = useState("");


  useEffect(() => {
    requestDeck();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestDeck() {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    );
    const json = await res.json();

    setDeck(json.deck);
  }


  return (
    <div className="search-params"></div>

  );
};

export default Board;
