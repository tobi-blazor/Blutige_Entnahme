import React, { useState, useEffect } from "react";
import { ImageBackground, View, Text, StyleSheet, Button } from "react-native";
import {
  BarCodeScanner,
  BarCodeEvent,
  BarCodeScannedCallback,
} from "expo-barcode-scanner";

function WelcomeScreen() {
  const [startScan, setStartScan] = useState<boolean>(false);
  const scanIDwithCamera = () => {
    console.log("open camera");
    setStartScan(true);
  };

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Nichts gescannt");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Kamera rechte anfragen
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Nach Barcode gescannt
  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
  }: BarCodeEvent) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  // berechtigung checken
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
        <Button
          title={"Kamera erlauben"}
          onPress={() => askForCameraPermission()}
        />
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
          <Button title={"Nochmal scannen"} onPress={() => setScanned(false)} />
        )}
        {scanned && (
          <Button
            title={"Anmelden"}
            onPress={() =>
              alert("Stell dir vor, der User " + text + " wäre jz angemeldet")
            }
          />
        )}
      </View>
    );
  }

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
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  barcodescanner: {},
});

export default WelcomeScreen;
