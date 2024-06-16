import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Entnahme() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Entnahme</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});

export default Entnahme;
