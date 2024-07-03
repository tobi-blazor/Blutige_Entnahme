import { View, Text, StyleSheet, FlatList } from "react-native";
import Patient from "../../models/Patient";
import Auftrag from "../../models/Auftrag";
import { auftragArray } from "../../data/dummy-data";
import IconGenerator from "../../components/IconGenerator";
import Blutprobe from "../../models/Blutprobe";
import useFetchAuftrag from "../../components/fetchAuftrag";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import BlutprobeListView from "../../components/BlutprobeListView";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EntnahmeDetails"
>;

function EntnahmeDetails({ route }: any) {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  function renderBlutproben({ item }: { item: Blutprobe }) {
    function pressHandler() {
      navigation.navigate("VerifyPatient", {
        probeNr: item.probeNr,
      });
    }

    if (!item) {
      console.error("Invalid item:", item);
      return (
        <View>
          <Text>Invalid Blutprobe data</Text>
        </View>
      );
    }

    return <BlutprobeListView blutprobe={item} onPress={pressHandler} />;
  }

  const { auftrag, loading, error } = useFetchAuftrag(
    "https://blutentnahme.azurewebsites.net/api/Auftraege/aktiv/" +
      route.params.auftragsID
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!auftrag) {
    return <Text>No data</Text>;
  }

  if (auftrag === null) {
    throw new Error("Auftrag not found");
  }

  return (
    <View style={styles.safeViewContainer}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingHorizontal: 15,
        }}
      >
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          {auftrag.patient.vorname} {auftrag.patient.nachname} -{" "}
          {auftrag.auftragsID}
        </Text>
        <IconGenerator input={auftrag?.auftragsID} />
        <Text>Geboren: {auftrag.patient.geburtsdatum.toDateString()}</Text>
        <Text>
          Geplanter Zeitpunkt:
          {auftrag.geplanterZeitpunkt.toLocaleString()}
        </Text>
      </View>
      <FlatList
        data={auftrag.entnahmeList}
        keyExtractor={(item, index) => item.probeNr + ""}
        renderItem={renderBlutproben}
      />
    </View>
  );
}

export default EntnahmeDetails;

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
