import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import {
  BarCodeScanner,
  BarCodeEvent,
  BarCodeScannedCallback,
} from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "About"
>;

function WelcomeScreen() {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const [startScan, setStartScan] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Nichts gescannt");
  const [employeeNumber, setEmployeeNumber] = useState<string>("");

  const scanIDwithCamera = () => {
    console.log("open camera");
    setStartScan(true);
  };

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
  }: BarCodeEvent) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  const handleLogin = () => {
    if (employeeNumber) {
      navigation.navigate("Mainpage");
    } else {
      alert("Bitte geben Sie eine Mitarbeitennummer ein");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Benötige Kamerarechte</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Keine Kameraberechtigung</Text>
        <Button title="Kamera erlauben" onPress={askForCameraPermission} />
      </View>
    );
  }

  if (hasPermission === true && startScan) {
    return (
      <View style={styles.container}>
        <View style={styles.barcodescanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text>{text}</Text>
        {scanned && (
          <Button title="Nochmal scannen" onPress={() => setScanned(false)} />
        )}
        {scanned && (
          <Button
            title="Anmelden"
            onPress={() =>
              alert(`Stell dir vor, der User ${text} wäre jetzt angemeldet`)
            }
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Bitte die Mitarbeiternummer eingeben
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Mitarbeiternummer"
        value={employeeNumber}
        onChangeText={setEmployeeNumber}
      />
      <View style={styles.boxcode}>
        <Button color={"#841584"} title="Einloggen" onPress={handleLogin} />
      </View>
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 20 }}>
        Oder den Mitarbeiterausweis scannen
      </Text>
      <Button color={"grey"} title="Kamera" onPress={scanIDwithCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  barcodescanner: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
  boxcode: {
    marginBottom: 10,
  },
});

export default WelcomeScreen;
