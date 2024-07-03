import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

function Profil() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg'}} />
      <Text style={styles.text}>Profil</Text>
      <Button
        title="Abmelden"
        onPress={() => {Alert.alert('Sie werden nun abgemeldet');  navigation.navigate("Home")}}
      />
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