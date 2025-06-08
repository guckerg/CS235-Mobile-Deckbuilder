import React, { useContext } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DeckContext } from "../src/context/DeckContext";

export default function CardListScreen() {
  const router = useRouter();
  const { deckId } = useLocalSearchParams();
  const { decks } = useContext(DeckContext);

  const deck = decks.find((d) => d.id === deckId) || {
    name: "Unknown Deck",
    cards: [],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cards in {deck.name}</Text>
      <FlatList
        data={deck.cards}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Button
              title="Remove"
              onPress={() => removeCardFromDeck(deckId, item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text>No Cards Added Yet.</Text>}
      />
      <Button
        title="Add Card"
        onPress={() => router.push(`/search?deckId=${deckId}`)}
      />
      <Button title="Back to Decks" onPress={() => router.push("/deck")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 20, marginBottom: 20 },
  item: { fontSize: 16, padding: 8 },
});
