import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
    showAlert(data, type, data);
  };

  const showAlert = (scannedValue: string, type: string, data: string) => {
    Alert.alert(
      "Gescannt!",
      `Der gescannte Wert ist: ${scannedValue}`,
      [
        {
          text: "Wiederholen",
          onPress: () => setStartScan(true),
          style: "cancel",
        },
        {
          text: "Abgeben",
          onPress: () => {
            console.log("Type: " + type + "\nData: " + data),
              fetchRequest(data);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const fetchRequest = async (id: string) => {
    const apiUrl =
      "https://blutentnahme.azurewebsites.net/api/Blutproben/transport/" + id;
    console.log(apiUrl);
    const response = await fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify({
        rohrID: id,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
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

  const { blutproben, loading, error, refetch } = useFetchBlutproben(
    "https://blutentnahme.azurewebsites.net/api/Blutproben/transport"
  );

  const [refreshing, setRefreshing] = useState(loading);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    if (refreshing) {
      refetch();
      console.log("refresh");
      setRefreshing(false);
    }
  }, [refreshing]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!blutproben) {
    return <Text>No data</Text>;
  }

  if (blutproben === null) {
    throw new Error("Keine Blutproben");
  }
  if (startScan) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{ height: 600, width: 500 }}
          />
          <Text>{text}</Text>
          <Button
            title="Abbrechen"
            onPress={() => {
              setStartScan(false);
            }}
          />
        </View>
      </View>
    );
  }
  if (startScan === false) {
    return (
      <View style={styles.safeViewContainer}>
        <Button
          title="Scannen und abgeben"
          onPress={() => setStartScan(true)}
        />
        <FlatList
          data={blutproben}
          keyExtractor={(item, index) => item.probeNr + ""}
          renderItem={renderBlutproben}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
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
  },
});

export default Transporte;
