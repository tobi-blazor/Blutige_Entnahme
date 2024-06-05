import React from "react";
import { ImageBackground, View, Text, StyleSheet, Button } from "react-native";

function WelcomeScreen() {
  const scanIDwithCamera = () => console.log("open camera)");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SWT Blutentnahme App</Text>
      <Text style={styles.text}>Bitte Einloggen</Text>
      <Button title="Kamera" onPress={scanIDwithCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default WelcomeScreen;
