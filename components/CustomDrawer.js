import React from "react";
import { Image, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

function CustomDrawer(props) {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="bg-blue-800 h-50 p-5   ">
          <Image
            source={require("../assets/images/user-profile.jpg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />

          <Text className="text-white font-bold text-xl mb-1">
            Anomynous User 1
          </Text>
          <View className="flex-row items-center align-center">
            <FontAwesome5 name="money-bill-alt" size={12} color="white" />
            <Text className="text-white text-xs ml-1"> 800.000 VNĐ</Text>
          </View>
        </View>
        <View className="flex-1 bg-white pt-1">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "gainsboro" }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View className="flex-row flex-start items-center align-center">
            <AntDesign name="sharealt" size={18} color="black" />
            <Text className="ml-3 text-base">Invite your friends!</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{ paddingVertical: 15 }}
        >
          <View className="flex-row flex-start items-center align-center">
            <AntDesign name="logout" size={18} color="black" />
            <Text className="ml-3 text-base">Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
