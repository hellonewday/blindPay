import { StyleSheet, Text, View } from "react-native";
import BottomNavigation from "./navigation/bottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation/appNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
