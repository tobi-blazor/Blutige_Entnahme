import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Qrscan from "../../components/Qrscan";
import IconGenerator from "../../components/IconGenerator";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddRohr"
>;

function VerifyRohr({ route }: { route: any }) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  let [rohrID, setRohrID] = useState("");
  const { probeNr, patientID, auftrag } = route.params;

  const handleScan = (scannedValue: string) => {
    setRohrID(scannedValue);
    showAlert(rohrID);
  };

  const showAlert = (scannedValue: string) => {
    Alert.alert(
      "Gescannt!",
      `Der gescannte Wert ist: ${scannedValue}`,
      [
        {
          text: "Wiederholen",
          onPress: () => setRohrID(""),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("FinishEntnahme", {
              probeNr: probeNr,
              patientID: patientID,
              rohrID: scannedValue,
            }),
        },
      ],
      { cancelable: false }
    );
  };

  if (rohrID === "") {
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
            {auftrag.patient.personID}
          </Text>
          <IconGenerator input={auftrag?.patient.personID} />
          <Text>Geboren: {auftrag.patient.geburtsdatum.toDateString()}</Text>
          <Text>
            Geplanter Zeitpunkt:
            {auftrag.geplanterZeitpunkt.toLocaleString()}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 30, paddingTop: 20 }}>
            Röhrchen einscannen
          </Text>
          <Qrscan onScan={handleScan} />
        </View>
      </View>
    );
  } else {
    return <Button title="Neu starten" onPress={() => setRohrID("")} />;
  }
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

export default VerifyRohr;
