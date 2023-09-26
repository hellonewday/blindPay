import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../components/screenWrapper";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
function SignUpScreen({ params }) {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async () => {
    if (email && password && username && fullName) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log("get error", error.message);
      }
    }
  };

  return (
    <View className="bg-white h-full w-full">
      {/* <Image
        className="h-1/2 w-full absolute"
        source={require("../assets/images/background-login.png")}
      />

      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[225] w-[90]"
          source={require("../assets/images/light-login.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}
          className="h-[160] w-[65]"
          source={require("../assets/images/light-login.png")}
        />
      </View> */}

      <View className="h-full w-full flex justify-around pt-20">
        <ScrollView>
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-black font-bold tracking-wider text-3xl"
            >
              Register an account
            </Animated.Text>
          </View>

          <View className="flex items-center mx-4 space-y-4 pt-10">
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                placeholderTextColor={"gray"}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholderTextColor={"gray"}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(100).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                placeholderTextColor={"gray"}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(150).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholderTextColor={"gray"}
                secureTextEntry
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(250).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                onPress={handleSubmit}
                className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
              >
                <Text className="text-xl font-bold text-white text-center">
                  Register
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(360).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Already have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-sky-600">Log in</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

export default SignUpScreen;
