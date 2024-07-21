import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuftragList from "./AuftragList";
import Transporte from "./Transporte";
import Profil from "./Profil";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;
          if (route.name === "AuftragList") {
            iconName = "vaccines" as const;
          } else if (route.name === "Transporte") {
            iconName = "directions-run" as const;
          } else if (route.name === "Profil") {
            iconName = "person" as const;
          } else {
            iconName = "error" as const;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#841584",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="AuftragList"
        component={AuftragList}
        options={{ title: "Aufträge" }}
      />
      <Tab.Screen name="Transporte" component={Transporte} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

export default MainScreen;
