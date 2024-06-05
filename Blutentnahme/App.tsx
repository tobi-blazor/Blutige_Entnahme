import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Button,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import WelcomeScreen from "./app/assets/screens/WelcomeScreen";

export default function App() {
  const handlePress = () => console.log("pressed)");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <WelcomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    paddingTop: Platform.OS === "android" ? 0 : 0,
    padding: "2%",
  },
});
