import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Blutprobe from "../models/Blutprobe";

export default function BlutprobeListView({
  blutprobe,
  onPress,
}: {
  blutprobe: Blutprobe;
  onPress: any;
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
    (blutprobe.spätesterEntnahmezeitpunkt.getTime() - Date.now()) / (1000 * 60);

  return (
    <Pressable onPress={onPress}>
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
            <Text>ProbeNr: {blutprobe.probeNr}</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={40} color="black" />
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
