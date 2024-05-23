import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import FullScreen from "@/components/containers/FullScreen";
import HeaderWithTitle from "@/components/headers/Header";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Oh yeah! User registered 😍");
    } catch (error: any) {
      let errorMessage = "An error occurred, sorry 😢";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Durr 🤣, this e-mail is already on use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Oh no 😒 invalid e-mail";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Damn! Password is weak bro, try again 😉";
      }
      setMessage(errorMessage);
    }
  };

  return (
    <FullScreen>
      <FormInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <FormInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FormButton title="Register" onPress={handleRegister} />

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    backgroundColor: "gray",
    padding: 20,
    color: "White",
    fontSize: 20,
    marginTop: 20,
  },
});
