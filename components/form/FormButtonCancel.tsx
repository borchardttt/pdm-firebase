import { Colors } from "@/consts/colors";
import { Spacing } from "@/consts/spacing";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image
} from "react-native";

type FormInput = {
  title: string;
} & TouchableOpacityProps;

export default function FormButtonCancel({ title, ...rest }: FormInput) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginTop: 15
  },
  title: {
    color: "red",
    textAlign: "center",
    fontSize: 20
  },
  buttonImage: {
    width: 200,
    height: 50,
  },
});
