import { View, Text, StyleSheet } from "react-native";
import Patient from "../../models/Patient";
import Auftrag from "../../models/Auftrag";
import { auftragArray } from "../../data/dummy-data";
import IconGenerator from "../../components/IconGenerator";

function EntnahmeDetails({ route }: any) {

  function getAuftragDetailsById(auftraege: Auftrag[], auftragId: string): Auftrag | null {
    for (const auftrag of auftraege) {
      if (auftrag.auftragsID === auftragId) {
        return auftrag;
      }
  }
  return null;
}

  const auftrag : Auftrag|null= getAuftragDetailsById(auftragArray ,route.params.auftragsID);
  return (
    <View style={styles.container}>
      <Text>{auftrag?.patient.vorname} {auftrag?.patient.nachname}</Text>
      <IconGenerator input={auftrag?.auftragsID } />
      <Text>Patient Details - {auftrag?.auftragsID}</Text>
    </View>
  );
}

export default EntnahmeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
