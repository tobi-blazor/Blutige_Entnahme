import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import useFetchBlutprobe from "../../components/fetchBlutprobe";
import { GlobalContext } from "../../components/CreateContext";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FinishEntnahme"
>;

function FinishEntnahme({ route }: { route: any }) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { probeNr, patientID, rohrID, personalID } = route.params;

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("SomeComponent must be used within a GlobalProvider");
  }

  const { globalState, setGlobalState } = context;

  const { blutprobe, loading, error } = useFetchBlutprobe(
    "https://blutentnahme.azurewebsites.net/api/Blutproben/" + probeNr
  );
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <View>
        <Text>Rohr: {rohrID}</Text>
        <Text>probeNR: {probeNr}</Text>
        <Text>Patient: {patientID}</Text>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!blutprobe) {
    return <Text>No data</Text>;
  }

  const showAlert = () => {
    Alert.alert(
      "Entnahme beenden?",
      ``,
      [
        {
          text: "Zurück",
          style: "cancel",
        },
        {
          text: "Bestätigen",
          onPress: () => updateBlutprobe(),
        },
      ],
      { cancelable: false }
    );
  };

  const updateBlutprobe = async () => {
    const url = `https://blutentnahme.azurewebsites.net/api/Blutproben/entnommen/${probeNr}?rohrID=${rohrID}&personalID=${globalState.personalID}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigation.navigate("MainScreen");
  };

  return (
    <View>
      <Text>Rohr: {rohrID}</Text>
      <Text>probeNR: {probeNr}</Text>
      <Text>Patient: {patientID}</Text>
      <Text>Personal: {globalState.personalID}</Text>
      <Text>api data: {blutprobe.grund}</Text>

      <Button title="Abschließen" onPress={showAlert} />
    </View>
  );
}

export default FinishEntnahme;
