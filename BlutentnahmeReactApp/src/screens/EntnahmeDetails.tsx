import { View, Text, StyleSheet } from "react-native";

function EntnahmeDetails({ route }: any) {
  const auftragsID = route.params.auftragsID;
  return (
    <View style={styles.container}>
      <Text>Patient Details - {auftragsID}</Text>
    </View>
  );
}

export default EntnahmeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
