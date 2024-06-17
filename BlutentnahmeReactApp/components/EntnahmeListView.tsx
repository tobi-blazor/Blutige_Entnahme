import { View, StyleSheet, Text, Pressable } from "react-native";
import Patient from "../models/Patient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../src/types/navigation";

export default function EntnahmeListView({
  vorname,
  nachname,
  anzahl,
  timespan,
  onPress,
}: {
  vorname: string;
  nachname: string;
  anzahl: number;
  timespan: Date;
  onPress: any; //TODO: Type definieren
}) {
  const timeDifference =
    Math.abs(timespan.getTime() - Date.now()) / (1000 * 60); // Difference in minutes

  return (
    <Pressable onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={{ alignItems: "flex-start" }}>
          <Text>in {Math.floor(timeDifference)} min</Text>
          <Text>
            {timespan.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text>
              {vorname} {nachname}
            </Text>
            <Text>{anzahl}x</Text>
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
