import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import Blutprobe from "../../models/Blutprobe";
import TransportListView from "../../components/TransportListView";
import useFetchBlutproben from "../../components/fetchBlutproben";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Transporte"
>;

function Transporte() {
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

  return (
    <View style={styles.safeViewContainer}>
      <Button title="Scannen und abgeben" />
      <FlatList
        data={blutproben}
        keyExtractor={(item, index) => item.probeNr + ""}
        renderItem={renderBlutproben}
      />
    </View>
  );
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
});

export default Transporte;
