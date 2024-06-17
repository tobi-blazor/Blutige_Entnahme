import { View, StyleSheet, Text, Pressable } from "react-native";
import Patient from "../models/Patient";

export default function EntnahmeListView({
  vorname,
  nachname,
  anzahl,
  timespan,
}: any) {
  // TODO Entnahmedatum und Entnahmemenge
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <View style={{ alignItems: "flex-start" }}>
          <Text>in xxx min</Text>
          <Text>10:55 Uhr</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text>
            {vorname} {nachname}
          </Text>
          <Text>2x</Text>
        </View>
      </View>
    </Pressable>
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
});
