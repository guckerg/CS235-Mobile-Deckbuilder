import React from "react";
import { Text, Image, Button, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { DeckContext } from "../src/context/DeckContext";

export default function CardDetailScreen() {
  const router = useRouter();
  const { card } = useLocalSearchParams();
  const parsedCard = JSON.parse(card);
  const { deckId } = useLocalSearchParams();
  const { addCardToDeck } = useContext(DeckContext);

  const handleAddCard = () => {
    addCardToDeck(deckId, parsedCard);
    router.push(`/cardlist?deckId=${deckId}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{parsedCard.name}</Text>
      {parsedCard.imageUrl && (
        <Image style={styles.image} source={{ uri: parsedCard.imageUrl }} />
      )}
      <Text style={styles.detail}>Type: {parsedCard.type}</Text>
      <Text style={styles.detail}>Rarity: {parsedCard.rarity}</Text>

      <Button title="Add Card To Deck" onPress={handleAddCard} />
      <Button title="Go Back" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  title: { fontSize: 24, marginVertical: 20 },
  image: { width: 200, height: 280, marginVertical: 10 },
  detail: { fontSize: 16, marginVertical: 5 },
});
