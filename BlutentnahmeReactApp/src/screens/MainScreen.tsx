import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entnahme from "./Entnahme";
import Transporte from "./Transporte";
import Profil from "./Profil";
import { Ionicons } from "@expo/vector-icons"; // Importiere die Icon-Bibliothek

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Entnahme") {
            iconName = "clipboard" as const; // Beispiel-Icon für Entnahme
          } else if (route.name === "Transporte") {
            iconName = "airplane" as const; // Beispiel-Icon für Transporte
          } else if (route.name === "Profil") {
            iconName = "woman-sharp" as const; //Beispiel-Icon für Transporte
          }

          return <Ionicons name={"clipboard"} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#841584",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Entnahme" component={Entnahme} />
      <Tab.Screen name="Transporte" component={Transporte} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

export default MainScreen;
