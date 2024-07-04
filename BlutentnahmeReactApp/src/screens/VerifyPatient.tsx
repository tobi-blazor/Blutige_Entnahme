import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Qrscan from "../../components/Qrscan";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VerifyPatient"
>;

function VerifyPatient({ route }: any) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  let [patientID, setPatientID] = useState("");
  const [probeNr, setProbeNr] = useState(route.params.probeNr);

  const handleScan = (scannedValue: string) => {
    setPatientID(scannedValue);
    showAlert(scannedValue);
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
            navigation.navigate("VerifyRohr", {
              probeNr: probeNr,
              patientID: scannedValue,
            }),
        },
      ],
      { cancelable: false }
    );
  };

  if (patientID == "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>PatientID: {patientID}</Text>
        <Text>{probeNr}</Text>

        <Qrscan onScan={handleScan} />
      </View>
    );
  }
}

export default VerifyPatient;
