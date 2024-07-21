import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const generateIcons = (input: string): React.ReactNode[] => {
  if (input.length !== 6) {
    throw new Error("Input string must be 6r characters long");
  }

  const icons: React.ReactNode[] = [];
  const firstThreeLetters = input.substring(0, 3);
  let iconName: keyof typeof MaterialIcons.glyphMap;

  switch (firstThreeLetters) {
    case "AUF":
      iconName = "task";
      break;
    case "PAT":
      iconName = "person";
      break;
    case "PER":
      iconName = "medical-services";
      break;
    case "BPR":
      iconName = "bloodtype";
      break;
    default:
      iconName = "help";
  }
  icons.push(<MaterialIcons key={0} name={iconName} size={30} color="black" />);

  for (let i = 3; i < 6; i++) {
    switch (input[i]) {
      case "0":
        iconName = "circle";
        break;
      case "1":
        iconName = "star";
        break;
      case "2":
        iconName = "rectangle";
        break;
      case "3":
        iconName = "change-history";
        break;
      case "4":
        iconName = "favorite";
        break;
      case "5":
        iconName = "add";
        break;
      case "6":
        iconName = "remove";
        break;
      case "7":
        iconName = "mail";
        break;
      case "8":
        iconName = "thumb-up";
        break;
      case "9":
        iconName = "thumb-down";
        break;
      default:
        iconName = "help";
    }

    icons.push(
      <MaterialIcons key={i - 2} name={iconName} size={30} color="black" />
    );
  }

  return icons;
};

const IconGenerator = ({ input }: { input: string }) => {
  const icons = generateIcons(input);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {icons.map((icon, index) => (
        <View key={index} style={{ alignItems: "center" }}>
          {icon}
        </View>
      ))}
    </View>
  );
};

export default IconGenerator;
