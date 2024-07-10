import { View, StyleSheet, Text, Pressable } from "react-native";
import Patient from "../models/Patient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../src/types/navigation";
import Blutprobe from "../models/Blutprobe";

export default function TransportListView({
  blutprobe,
}: {
  blutprobe: Blutprobe;
}) {
  if (!blutprobe) {
    console.error("Invalid item:", blutprobe);
    return (
      <View>
        <Text>Invalid patient data</Text>
      </View>
    );
  }

  const timeDifference =
    (blutprobe.spätesterEntnahmezeitpunkt.getTime() - Date.now()) / (1000 * 60); // Difference in minutes

  return (
    <View style={styles.itemContainer}>
      <View style={{ alignItems: "flex-start" }}>
        <Text>{Math.floor(timeDifference)} min verbleiben</Text>
        <Text>
          {blutprobe.spätesterEntnahmezeitpunkt.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignItems: "flex-end" }}>
          <Text>{blutprobe.grund}</Text>
          <Text>ProbeNr: {blutprobe.rohrID}</Text>
        </View>
      </View>
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
