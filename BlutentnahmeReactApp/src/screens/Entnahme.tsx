import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { auftragArray } from "../../data/dummy-data";
import EntnahmeListView from "../../components/EntnahmeListView";
import Patient from "../../models/Patient";
import Auftrag from "../../models/Auftrag";

function renderEntnahmeItem({ item }: { item: Auftrag }) {
  if (!item) {
    console.error("Invalid item:", item);
    return (
      <View>
        <Text>Invalid patient data</Text>
      </View>
    );
  }
  const vorname = item.patient.vorname ?? "Unknown";
  const nachname = item.patient.nachname ?? "Unknown";
  return (
    <EntnahmeListView
      vorname={vorname}
      nachname={nachname}
      anzahl={item.entnahmeList.length} // Example: Number of Blutprobe entries
      timespan={item.geplanterZeitpunkt} // Example: Planned time
    />
  );
}

function Entnahme() {
  return (
    <FlatList
      data={auftragArray}
      keyExtractor={(item) => item.auftragsID}
      renderItem={renderEntnahmeItem}
    />
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

export default Entnahme;
