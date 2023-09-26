import { createDrawerNavigator } from "@react-navigation/drawer";
import AppNavigation from "./appNavigation";
import AccountScreen from "../screens/AccountScreen";
import SettingScreen from "../screens/SettingScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./bottomNavigation";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();
export function DrawNaviagtion() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="HomeDrawNavigation"
      screenOptions={{
        drawerActiveBackgroundColor: "darkblue",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="HomeDrawNavigation"
        component={BottomNavigation}
        options={{
          drawerLabel: "Home",
          drawerIcon: (color, size, focused) => {
            return color.focused == false ? (
              <Ionicons
                name="home-outline"
                size={color.size}
                color={color.color}
              />
            ) : (
              <Ionicons
                name="home-sharp"
                size={color.size}
                color={color.color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerIcon: (color, size, focused) => {
            return color.focused == false ? (
              <Ionicons
                name="person-outline"
                size={color.size}
                color={color.color}
              />
            ) : (
              <Ionicons name="person" size={color.size} color={color.color} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: (color, size, focused) => {
            return color.focused == false ? (
              <Ionicons
                name="ios-settings-outline"
                size={color.size}
                color={color.color}
              />
            ) : (
              <Ionicons
                name="ios-settings-sharp"
                size={color.size}
                color={color.color}
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen name="Logout" component={Article} /> */}
    </Drawer.Navigator>
  );
}
