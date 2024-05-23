import { View, Text, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    maxWidth: "90%",
    padding: 24,
    width: "100%",
  },
});
