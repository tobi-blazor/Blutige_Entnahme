import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Homescreen";
import MainScreen from "./src/screens/MainScreen";
import Login from "./src/screens/Login";

import { RootStackParamList } from "./src/types/navigation";
import AuftragDetails from "./src/screens/AuftragDetails";
import VerifyPatient from "./src/screens/VerifyPatient";
import AddRohr from "./src/screens/AddRohr";
import FinishEntnahme from "./src/screens/FinishEntnahme";
import { GlobalProvider } from "./components/CreateContext";
import { View } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuftragDetails"
            component={AuftragDetails}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen
            name="VerifyPatient"
            component={VerifyPatient}
            options={{
              title: "Blutentnahmevorgang",
              headerLeft: () => <View />,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="AddRohr"
            component={AddRohr}
            options={{
              title: "Blutentnahmevorgang",
              headerLeft: () => <View />,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="FinishEntnahme"
            component={FinishEntnahme}
            options={{
              title: "Blutentnahmevorgang",
              headerLeft: () => <View />,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
