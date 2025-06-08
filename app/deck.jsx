import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { DeckContext } from "../src/context/DeckContext";

export default function DeckScreen() {
  const router = useRouter();
  const { decks } = useContext(DeckContext);

  const renderDeck = ({ item }) => (
    <TouchableOpacity
      style={styles.deckItem}
      onPress={() => router.push(`/cardlist?deckId=${item.id}`)}
    >
      <Text style={styles.deckText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Deck:</Text>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={renderDeck}
        ListEmptyComponent={<Text>No decks available</Text>}
      />
      <Button title="Back Home" onPress={() => router.push("/")} />
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
  deckItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 6,
    width: "80%",
    alignItems: "center",
  },
  deckText: { fontSize: 18 },
});
