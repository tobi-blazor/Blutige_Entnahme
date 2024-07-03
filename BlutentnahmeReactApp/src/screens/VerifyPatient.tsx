import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VerifyPatient"
>;

function VerifyPatient({ route }: any) {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  return <Text>{route.params.probeNr}</Text>;
}

export default VerifyPatient;
