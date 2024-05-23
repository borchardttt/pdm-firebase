import { View, Text, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { Stack } from "expo-router";
import { Colors } from "@/consts/colors";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

type FullScreenProps = {
  children: ReactNode;
};

export default function FullScreen({ children }: FullScreenProps) {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});
