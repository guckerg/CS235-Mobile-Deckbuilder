import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DeckContext } from "../src/context/DeckContext";
import axios from "axios";

export default function SearchScreen() {
  const router = useRouter();
  const { deckId } = useLocalSearchParams();
  const { addCardToDeck } = useContext(DeckContext);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //fetch from gatherer API
  const handleSearch = async () => {
    if (!searchText) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.magicthegathering.io/v1/cards",
        {
          params: { name: searchText },
        }
      );

      //console.log("fetch repsonse", response);
      const data = response.data;

      //if something did come back from the response but the data is bad, throw error
      if (data.cards && data.cards.length > 0) {
        setSearchResults(data.cards);
      } else {
        throw new Error("There was a problem finding searched cards.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = (card) => {
    if (deckId && card) {
      addCardToDeck(deckId, card);
      router.push(`./cardlist?deckId=${deckId}`);
    }
  };

  return (
    <View style={styles.container}>
      {/*Search input field for card*/}
      <Text style={styles.title}>Search for a Card:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card name"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginVertical: 20 }}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/*display field for cards found*/}
      {searchResults.length && !loading && (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsText}>Results: {item.name}</Text>
              {item.imageUrl && (
                <Image
                  style={{ width: 220, height: 300, marginVertical: 10 }}
                  source={{ uri: item.imageUrl }}
                />
              )}
              <Button title="Add Card" onPress={() => handleAddCard(item)} />
            </View>
          )}
        />
      )}
      {/*Back navigation*/}
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
  resultsContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  resultsText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
