import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import useFetchBlutprobe from "../../components/fetchBlutprobe";
import { GlobalContext } from "../../components/CreateContext";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FinishEntnahme"
>;

function FinishEntnahme({ route }: { route: any }) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { probeNr, patientID, rohrID, personalID } = route.params;
  const [seconds, setSeconds] = useState(0);
  const context = useContext(GlobalContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!context) {
    throw new Error("SomeComponent muss in GlobalProvider benutzt werden");
  }

  const { globalState, setGlobalState } = context;

  const { blutprobe, loading, error } = useFetchBlutprobe(
    "https://blutentnahme.azurewebsites.net/api/Blutproben/" + probeNr
  );
  if (loading) {
    return <Text>Lädt...</Text>;
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
    <View style={styles.container}>
      <Text style={styles.header}>Blutentnahme läuft...</Text>
      <View style={styles.valuesContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Patient:</Text>
          <Text style={styles.value}>{patientID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Rohr:</Text>
          <Text style={styles.value}>{rohrID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Grund:</Text>
          <Text style={styles.value}>{blutprobe.grund}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hinweise:</Text>
          <Text style={styles.value}>{blutprobe.hinweise}</Text>
        </View>
      </View>
      <Text style={styles.timer}>Vergangene Zeit: {seconds} Sekunden</Text>
      <Button title="Abschließen" onPress={showAlert} />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  valuesContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
  },
  timer: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default FinishEntnahme;
