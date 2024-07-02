import { View, Text, StyleSheet } from "react-native";
import Patient from "../../models/Patient";
import Auftrag from "../../models/Auftrag";
import { auftragArray } from "../../data/dummy-data";
import IconGenerator from "../../components/IconGenerator";
import Blutprobe from "../../models/Blutprobe";

function EntnahmeDetails({ route }: any) {

  function getAuftragDetailsById(auftraege: Auftrag[], auftragId: string): Auftrag | null {
    for (const auftrag of auftraege) {
      if (auftrag.auftragsID === auftragId) {
        return auftrag;
      }
  }
  return null;
}

const printEntnahmeDetails = (entnahmeList: Blutprobe[]): React.ReactNode[] => {
  return entnahmeList.map((entnahme, index) => (
    <View key={index} style={{ margin: 10, padding: 10, borderColor: 'black', borderWidth: 1 }}>
      <Text>Blutprobe ID: {entnahme.probeID}</Text>
      <Text>Hinweise: {entnahme.hinweise}</Text>
      <Text>Grund: {entnahme.grund}</Text>
      <Text>
        Maximale Verweildauer: 
        Start: {entnahme.maximaleVerweildauer.startTime.toString()}, 
        End: {entnahme.maximaleVerweildauer.endTime?.toString()}
      </Text>
      <Text>Entnahme Zeitpunkt: {entnahme.entnahmeZeitpunkt?.toString()}</Text>
    </View>
  ));
};

  const auftrag : Auftrag|null= getAuftragDetailsById(auftragArray ,route.params.auftragsID);
  if (auftrag === null) {
  throw new Error('Auftrag not found');
}
  return (
    <View style={styles.container}>
      <View style={{borderBottomColor:"black", borderBottomWidth:1}}>
        <Text style={{fontSize: 20}}>{auftrag.patient.vorname} {auftrag.patient.nachname} - {auftrag.auftragsID}</Text>
        <IconGenerator input={auftrag?.auftragsID } />
        <Text>Geboren: {auftrag.patient.geburtsdatum.toDateString()}</Text>
        <Text>Geplanter Zeitpunkt: {auftrag.geplanterZeitpunkt.toISOString()}</Text>
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
