import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Qrscan from "../../components/Qrscan";
import IconGenerator from "../../components/IconGenerator";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VerifyPatient"
>;

function VerifyPatient({ route }: any) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  let [patientID, setPatientID] = useState("");
  const [patientData, setPatientData] = useState(null);
  const { probeNr, auftrag } = route.params;

  const verifyPatientID = async (id: string) => {
    try {
      const response = await fetch(
        `https://blutentnahme.azurewebsites.net/api/Patienten/${id}`
      );
      if (response.ok && id === auftrag.patient.personID) {
        const data = await response.json();
        setPatientData(data);
        showAlert(id);
      } else {
        showErrorAlert();
      }
    } catch (error) {
      showErrorAlert();
    }
  };

  const handleScan = (scannedValue: string) => {
    setPatientID(scannedValue);
    verifyPatientID(scannedValue);
  };

  const showAlert = (scannedValue: string) => {
    Alert.alert(
      "Gescannt!",
      `Der gescannte Wert ist: ${scannedValue}`,
      [
        {
          text: "Wiederholen",
          onPress: () => setPatientID(""),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("AddRohr", {
              probeNr: probeNr,
              patientID: scannedValue,
              auftrag: auftrag,
            }),
        },
      ],
      { cancelable: false }
    );
  };

  const showErrorAlert = () => {
    Alert.alert(
      "Fehler",
      "Patient konnte nicht verifiziert werden. Bitte erneut versuchen.",
      [
        {
          text: "OK",
          onPress: () => setPatientID(""),
        },
      ],
      { cancelable: false }
    );
  };

  if (patientID === "") {
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
            Patient einscannen
          </Text>
          <Qrscan onScan={handleScan} />
        </View>
      </View>
    );
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

export default VerifyPatient;
