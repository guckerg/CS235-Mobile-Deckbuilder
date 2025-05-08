import React, { createContext, useState } from "react";

export const DeckContext = createContext();

export function DeckProvider({ children }) {
  const [decks, setDecks] = useState([
    { id: "1", name: "Deck 1", cards: [] },
    { id: "2", name: "Deck 2", cards: [] },
  ]);

  const addCardToDeck = (deckId, card) => {
    setDecks((oldDecks) =>
      oldDecks.map((deck) =>
        deck.id === deckId ? { ...deck, cards: [...deck.cards, card] } : deck
      )
    );
  };

  return (
    <DeckContext.Provider value={{ decks, addCardToDeck }}>
      {children}
    </DeckContext.Provider>
  );
}
