import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DeckContext = createContext();

export function DeckProvider({ children }) {
  const [decks, setDecks] = useState([]);

  //get storage data or mock data on initialization
  useEffect(() => {
    const loadDecks = async () => {
      try {
        const storedDecks = await AsyncStorage.getItem("decks");
        if (storedDecks !== null) {
          setDecks(JSON.parse(storedDecks));
        } else {
          setDecks([
            { id: "1", name: "Deck 1", cards: [] },
            { id: "2", name: "Deck 2", cards: [] },
          ]);
        }
      } catch (error) {
        console.error("Failed to load decks:", error);
      }
    };

    loadDecks();
  }, []);

  //update storage when deck state changes
  useEffect(() => {
    const saveDecks = async () => {
      try {
        await AsyncStorage.setItem("decks", JSON.stringify(decks));
      } catch (error) {
        console.error("Failed to save decks:", error);
      }
    };

    //only save the deck when it has cards in it
    if (decks.length > 0) {
      saveDecks();
    }
  }, [decks]);

  const addCardToDeck = (deckId, card) => {
    setDecks((oldDecks) =>
      oldDecks.map((deck) =>
        deck.id === deckId ? { ...deck, cards: [...deck.cards, card] } : deck
      )
    );
  };

  const removeCardFromDeck = (deckId, cardId) => {
    setDecks((oldDecks) =>
      oldDecks.map((deck) =>
        deck.id === deckId
          ? { ...deck, cards: deck.cards.filter((card) => card.id !== cardId) }
          : deck
      )
    );
  };

  return (
    <DeckContext.Provider value={{ decks, addCardToDeck, removeCardFromDeck }}>
      {children}
    </DeckContext.Provider>
  );
}
