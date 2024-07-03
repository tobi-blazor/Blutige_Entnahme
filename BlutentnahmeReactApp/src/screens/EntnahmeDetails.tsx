import { View, Text, StyleSheet } from "react-native";
import Patient from "../../models/Patient";
import Auftrag from "../../models/Auftrag";
import { auftragArray } from "../../data/dummy-data";
import IconGenerator from "../../components/IconGenerator";
import Blutprobe from "../../models/Blutprobe";
import useFetchAuftrag from "../../components/fetchAuftrag";

function EntnahmeDetails({ route }: any) {
  const printEntnahmeDetails = (
    entnahmeList: Blutprobe[]
  ): React.ReactNode[] => {
    return entnahmeList.map((entnahme, index) => (
      <View
        key={index}
        style={{
          margin: 10,
          padding: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <Text>Blutprobe ID: {entnahme.probeID}</Text>
        <Text>Hinweise: {entnahme.hinweise}</Text>
        <Text>Grund: {entnahme.grund}</Text>
        <Text>
          Spätester Entnahmezeitpunkt:{" "}
          {entnahme.spätesterEntnahmezeitpunkt.toLocaleString()}
        </Text>
        <Text>
          Entnahme Zeitpunkt: {entnahme.entnahmeZeitpunkt?.toLocaleString()}
        </Text>
      </View>
    ));
  };

  const { auftrag, loading, error } = useFetchAuftrag(
    "https://blutentnahme.azurewebsites.net/api/Auftraege/" +
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
    <View style={styles.container}>
      <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 20 }}>
          {auftrag.patient.vorname} {auftrag.patient.nachname} -{" "}
          {auftrag.auftragsID}
        </Text>
        <IconGenerator input={auftrag?.auftragsID} />
        <Text>Geboren: {auftrag.patient.geburtsdatum.toLocaleString()}</Text>
        <Text>
          Geplanter Zeitpunkt:
          {auftrag.geplanterZeitpunkt.toLocaleString()}
        </Text>
        {printEntnahmeDetails(auftrag.entnahmeList)}
      </View>
    </View>
  );
}

export default EntnahmeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
