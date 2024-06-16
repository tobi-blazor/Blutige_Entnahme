import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { PATIENTEN } from "../../data/dummy-data";
import EntnahmeListView from "../../components/EntnahmeListView";
import Patient from "../../models/Patient";

function renderEntnahmeItem({ item }: { item: Patient }) {
  if (!item) {
    console.error("Invalid item:", item);
    return (
      <View>
        <Text>Invalid patient data</Text>
      </View>
    );
  }
  return (
    <EntnahmeListView
      personID={item.personID}
      vorname={item.vorname}
      nachname={item.nachname}
      geburtsdatum={item.geburtsdatum}
      hinweise={item.hinweise}
    />
  );
}

function Entnahme() {
  return (
    <FlatList
      data={PATIENTEN}
      keyExtractor={(item) => item.personID}
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
