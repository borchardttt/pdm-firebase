import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/consts/colors";
import { Spacing } from "@/consts/spacing";

type FormInput = {
  label?: string;
} & TextInputProps;

export default function FormInput({ label, ...rest }: FormInput) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container, focus && styles.focusContainer]}>
      {label && (
        <Text style={[styles.label, focus && styles.focus]}>{label}</Text>
      )}
      <TextInput
        {...rest}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.mt,
    padding: 4,
    width: "80%",
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#93c122",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: "black",
  },
  focus: {
    color: Colors.primary,
  },
  focusContainer: {
    borderBottomColor: Colors.primary,
  },
});
