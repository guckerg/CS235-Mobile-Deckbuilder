import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DeckContext } from "../src/context/DeckContext";

export default function SearchScreen() {
  const router = useRouter();
  const { deckId } = useLocalSearchParams();
  const { addCardToDeck } = useContext(DeckContext);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  //not a real search until API is re-added
  const handleSearch = async () => {
    const fakeCardData = { name: searchText, id: Date.now().toString() };
    setSearchResult(fakeCardData);
  };

  const handleAddCard = () => {
    if (deckId && searchResult) {
      addCardToDeck(deckId, searchResult);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Card:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card name"
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* This button will eventually trigger an API search */}
      <Button title="Search" onPress={handleSearch} />
      {searchResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Result: {searchResult.name}</Text>
          <Button title="Add Card To Deck" onPress={handleAddCard} />
        </View>
      )}
      <Button
        title="Back to card list"
        onPress={() => router.push(`./cardlist?deckId=${deckId}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
