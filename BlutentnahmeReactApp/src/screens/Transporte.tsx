import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
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

  const [text, setText] = useState("Nichts gescannt");

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
  }: BarCodeEvent) => {
    setText(data);
    setStartScan(false);
    console.log("Type: " + type + "\nData: " + data);
    //TODO: Hier sollt die put aufgerufen werden mit der aktuellen sys time
  };

  /*
  const putRequest = async (probe:string) => {
    const currentDate = new Date();
    try
    {
      const response = await fetch("https://blutentnahme.azurewebsites.net/api/Blutproben", {
        method: "PUT",
        body: JSON.stringify({
          id: probe,
          laborEingang: currentDate.getTime(),
        }),
      })
      if (response.ok) {
        const data = await response.json();
      } else {
        showErrorAlert();
      }
    }catch (error) {
      showErrorAlert();
    }
  };

  const showErrorAlert = () => {
    Alert.alert(
      "Fehler",
      "Röhrchen konnte nicht geupdated werden",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };
*/
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
          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 600, width: 500 }}
            />
            <Text>{text}</Text>
            <Button title = "Abbrechen" onPress={() => {setStartScan(false)}}/>
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
