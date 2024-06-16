import { View, Pressable, StyleSheet, Text } from "react-native";
import Patient from "../models/Patient";

export default function EntnahmeListView({
  personID,
  vorname,
  nachname,
  geburtsdatum,
  hinweise,
}: Patient) {
  // TODO Entnahmedatum und Entnahmemenge
  return (
    <View>
      <Pressable>
        <View style={styles.itemContainer}>
          <View style={{ alignItems: "flex-start" }}>
            <Text>in 5 min</Text>
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
});
