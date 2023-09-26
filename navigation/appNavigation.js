import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import CartScreen from "../screens/CartScreen";
import { DrawNaviagtion } from "./drawNavigation";
import BlindScreen from "../screens/BlindScreen";
import SignUpScreen from "../screens/SignUpScreen";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useAuth();
  if (user) {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={DrawNaviagtion}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cart"
          component={CartScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Blind"
          component={BlindScreen}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={SignUpScreen}
        />
      </Stack.Navigator>
    );
  }
}
