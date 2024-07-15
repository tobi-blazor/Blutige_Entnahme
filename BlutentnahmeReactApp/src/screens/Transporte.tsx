import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import Blutprobe from "../../models/Blutprobe";
import TransportListView from "../../components/TransportListView";
import useFetchBlutproben from "../../components/fetchBlutproben";
import {
  BarCodeScanner,
  BarCodeEvent,
  BarCodeScannedCallback,
} from "expo-barcode-scanner";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Transporte"
>;

function Transporte() {
  const [startScan, setStartScan] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Nichts gescannt");

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
  }: BarCodeEvent) => {
    setScanned(true);
    setText(data);
    setStartScan(false);
    console.log("Type: " + type + "\nData: " + data);
    //TODO: Hier sollt die put aufgerufen werden mit der aktuellen sys time
  };

  function renderBlutproben({ item }: { item: Blutprobe }) {
    if (!item) {
      console.error("Invalid item:", item);
      return (
        <View>
          <Text>Invalid Blutprobe data</Text>
        </View>
      );
    }

    return <TransportListView blutprobe={item} />;
  }

  const { blutproben, loading, error } = useFetchBlutproben(
    "https://blutentnahme.azurewebsites.net/api/Blutproben/transport"
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!blutproben) {
    return <Text>No data</Text>;
  }

  if (blutproben === null) {
    throw new Error("Keine Blutproben");
  }
  if(startScan)
  {
    return (
      <View style={styles.container}>
          <View style={styles.barcodescanner}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
            <Button title = "Abbrechen" onPress={() => setStartScan(false)}/>
          </View>
      </View>
    );
  }
  if(startScan === false)
  {
    return (
        <View style={styles.safeViewContainer}>
          <Button title="Scannen und abgeben" onPress={() => setStartScan(true)}/> 
          <FlatList
            data={blutproben}
            keyExtractor={(item, index) => item.probeNr + ""}
            renderItem={renderBlutproben}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 15,
  },
  safeViewContainer: {
    flexDirection: "column",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodescanner: {
    marginBottom: 20,
  }
});

export default Transporte;
