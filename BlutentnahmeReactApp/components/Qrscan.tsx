import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import {
  BarCodeScanner,
  BarCodeEvent,
  BarCodeScannedCallback,
} from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

function Qrscan({ onScan }: { onScan: (value: string) => void }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(true);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Nichts gescannt");

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

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Benötige Kamerarechte</Text>
      </View>
    );
  }

  if (hasPermission == false) {
    return (
      <View style={styles.container}>
        <Text>Keine Kameraberechtigung</Text>
        <Button title="Kamera erlauben" onPress={askForCameraPermission} />
      </View>
    );
  }

  if (hasPermission == true) {
    return (
      <View style={styles.container}>
        <View style={styles.barcodescanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text>{text}</Text>

        {scanned && <Button title="Weiter" onPress={() => onScan(text)} />}
      </View>
    );
  }
  if (scanned) {
  }
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
  boxcode: {
    marginBottom: 10,
  },
});

export default Qrscan;
