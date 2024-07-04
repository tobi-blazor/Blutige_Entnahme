import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Qrscan from "../../components/Qrscan";
import useFetchBlutprobe from "../../components/fetchBlutprobe";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VerifyRohr"
>;

function VerifyRohr({ route }: { route: any }) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  let [rohrID, setRohrID] = useState("");
  const { probeNr, patientID } = route.params;

  const handleScan = (scannedValue: string) => {
    rohrID = scannedValue;
    showAlert(rohrID);
  };

  function pressHandler() {}

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

  if (rohrID == "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Qrscan onScan={handleScan} />
      </View>
    );
  } else {
    return <Text> Irgendwas schiefgelaufen</Text>;
  }
}

export default VerifyRohr;
