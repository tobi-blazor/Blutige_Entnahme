import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import AuftragListView from "../../components/AuftragListView";
import Auftrag from "../../models/Auftrag";
import useFetchAuftraege from "../../components/fetchAuftraege";
import { useFocusEffect } from "@react-navigation/native";

function AuftragList({ navigation }: any) {
  const { auftraege, loading, error, refetch } = useFetchAuftraege(
    "https://blutentnahme.azurewebsites.net/api/Auftraege/aktiv"
  );

  const [refreshing, setRefreshing] = useState(loading);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    if (refreshing) {
      refetch();
      console.log("refresh");
      setRefreshing(false);
    }
  }, [refreshing]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  function renderEntnahmeItem({ item }: { item: Auftrag }) {
    function pressHandler() {
      navigation.navigate("AuftragDetails", {
        auftragsID: item.auftragsID,
      });
    }

    if (!item) {
      return (
        <View>
          <Text>Ungültige Daten</Text>
        </View>
      );
    }

    const vorname = item.patient.vorname ?? "Unbekannt";
    const nachname = item.patient.nachname ?? "Unbekannt";
    return (
      <AuftragListView
        vorname={vorname}
        nachname={nachname}
        anzahl={item.entnahmeList.length}
        timespan={item.geplanterZeitpunkt}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={auftraege}
      keyExtractor={(item) => item.auftragsID}
      renderItem={renderEntnahmeItem}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
    />
  );
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

export default AuftragList;
