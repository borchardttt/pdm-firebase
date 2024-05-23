import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import HeaderWithTitle from "../components/headers/Header";
import { Card } from "react-native-paper";

export default function about() {
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        title="Sobre o aplicativo TopCar"
        actionSheetOptions={["Cancel", "Home", "Logout"]}
        HideThisPage={true}
      />

      <Card style={styles.card}>
        <Text style={styles.boldText}>User Register</Text>

        <Text style={styles.boldText}>Versao 0.1</Text>

        <Text style={styles.text}>Gabriel Borchardt</Text>

        <Text style={styles.text}>
          https://github.com/borchardttt/pdm-firebase.git
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
  },
  boldText: {
    marginTop: 15,
    marginBottom: 10,
    color: "black",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    marginTop: 15,
    marginBottom: 10,
    color: "grey",
    textAlign: "center",
    fontSize: 14,
  },
});
