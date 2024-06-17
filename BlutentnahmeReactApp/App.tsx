import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Homescreen";
import AboutScreen from "./src/screens/Login";
import MainScreen from "./src/screens/MainScreen";
import Entnahme from "./src/screens/Entnahme";
import Transporte from "./src/screens/Transporte";
import Login from "./src/screens/Login";

import { RootStackParamList } from "./src/types/navigation";
import EntnahmeDetails from "./src/screens/EntnahmeDetails";

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="EntnahmeDetails" component={EntnahmeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
