import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatBotScreen from "../screens/ChatbotScreen";
// import HomeScreen from "../screens/HomeScreen";
import BlindScreen from "../screens/BlindScreen";
import AppNavigation from "./appNavigation";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: "#444",
        tabBarActiveBackgroundColor: "transparent",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="HomeNavigation"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => {
            return focused == false ? (
              <Ionicons name="home-outline" size={size} color={color} />
            ) : (
              <Ionicons name="home-sharp" size={size} color={color} />
            );
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="BlindButton"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused == false ? (
              <Ionicons name="eye-outline" size={size} color={color} />
            ) : (
              <Ionicons name="eye-sharp" size={size} color={color} />
            );
          },
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Blind");
              }}
              style={{
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: "#e32f45",
                }}
              >
                <View style={{ left: 17, top: 13 }}>
                  <Ionicons name="eye-sharp" size={40} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          ),
        }}
        component={BlindScreen}
      />
      <Tab.Screen
        name="Chatbot"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused == false ? (
              <Ionicons
                name="md-chatbox-ellipses-outline"
                size={size}
                color={color}
              />
            ) : (
              <Ionicons name="md-chatbox-ellipses" size={size} color={color} />
            );
          },
        }}
        component={ChatBotScreen}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    position: "absolute",
    borderRadius: 30,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
  },
  blindTab: {
    backgroundColor: "red",
    borderRadius: 50,
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomNavigation;
