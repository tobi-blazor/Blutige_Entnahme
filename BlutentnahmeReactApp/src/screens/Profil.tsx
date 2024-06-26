import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";

function Profil() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil</Text>
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
  image: {
    width: 70, 
    height: 70,
    borderRadius:70
  },
});

export default Profil;