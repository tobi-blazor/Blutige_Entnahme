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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Startseite" }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="AuftragDetails" component={AuftragDetails} />
          <Stack.Screen name="VerifyPatient" component={VerifyPatient} />
          <Stack.Screen name="AddRohr" component={AddRohr} />
          <Stack.Screen name="FinishEntnahme" component={FinishEntnahme} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
