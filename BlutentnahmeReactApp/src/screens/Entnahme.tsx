import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import EntnahmeListView from "../../components/EntnahmeListView";
import Patient from "../../models/Patient";
import Auftrag from "../../models/Auftrag";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { fetchAktiveAuftraege } from "../../components/api_requests";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Entnahme"
>;



function Entnahme({ navigation }: any) {

  const [auftraege, setAuftraege] = useState<Auftrag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAktiveAuftraege();
        setAuftraege(data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  function renderEntnahmeItem({ item }: { item: Auftrag }) {
    function pressHandler() {
      navigation.navigate("EntnahmeDetails", {
        auftragsID: item.auftragsID,
      });
    }

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
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={auftraege}
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
