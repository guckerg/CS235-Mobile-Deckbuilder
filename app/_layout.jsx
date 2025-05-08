import { Stack } from "expo-router";
import React from "react";
import { DeckProvider } from "../src/context/DeckContext";

export default function RootLayout() {
  return (
    <DeckProvider>
      <Stack />
    </DeckProvider>
  );
}
