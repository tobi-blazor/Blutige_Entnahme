import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Homescreen";
import AboutScreen from "./src/screens/AboutScreen";
import Mainpage from "./src/screens/MainScreen";
import Entnahme from "./src/screens/Entnahme";
import Transporte from "./src/screens/Transporte";

// Define the types for the navigation stack
type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Mainpage: undefined; // Hinzugefügt
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Startseite" }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "Zurück" }}
        />
        <Stack.Screen
          name="Mainpage"
          component={Mainpage}
          options={{ title: "Hauptseite" }} // Hinzugefügt
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
