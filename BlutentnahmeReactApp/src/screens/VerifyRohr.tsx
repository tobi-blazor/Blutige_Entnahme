import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Qrscan from "../../components/Qrscan";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VerifyRohr"
>;

function VerifyRohr({ route }: any) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  let [rohrID, setRohrID] = useState("");
  let [scanComplete, setScanComplete] = useState(false);

  const handleScan = (scannedValue: string) => {
    setRohrID(scannedValue);
    showAlert(scannedValue);
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
          onPress: () => setScanComplete(true),
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
  } else if (scanComplete) {
    return (
      <View>
        <Text>Rohr: {rohrID}</Text>
        <Button title="Abschließen" />
      </View>
    );
  }
}

export default VerifyRohr;
