import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../components/screenWrapper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../themes";
import { cartItems } from "../constants";
import FruitCardCart from "../components/FruitCardCart";
import { FontAwesome } from "@expo/vector-icons";

function CartScreen({ params }) {
  const navigation = useNavigation();
  const [status, setStatus] = useState(true);
  return (
    <ScreenWrapper className="flex-1 flex justify-between bg-orange-50">
      <View className="flex-row justify-start mx-5">
        <TouchableOpacity
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          className="border border-gray-300 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={28} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="mx-5 py-4">
        <Text style={{ color: colors.text }} className="text-2xl">
          Your <Text className="font-bold">cart</Text>
        </Text>
        <Text
          className="text-xs pb-2 mb-4"
          style={{
            color: "gray",
            borderBottomColor: "gainsboro",
            borderBottomWidth: 1,
          }}
        >
          Check-in: 10:00:01 15/09/2023
        </Text>
        <View>
          {cartItems.map((fruit, index) => {
            return <FruitCardCart key={index} fruit={fruit} />;
          })}
        </View>

        <View
          className="flex-row justify-between mt-8 p-2 align-center items-center"
          style={{ borderTopColor: "gainsboro", borderTopWidth: 1 }}
        >
          <View className="flex-1">
            <Text className="font-bold mb-2">Invoice Code:</Text>
            <Text className="font-bold  mb-2">Discount:</Text>
            <Text className="font-bold  mb-2">Total:</Text>
            <Text className="font-bold  mb-2">Status:</Text>
          </View>
          <View className="flex-1">
            <Text className="font-bold mb-2" style={{ textAlign: "right" }}>
              GG01004848328
            </Text>
            <Text className="font-bold  mb-2" style={{ textAlign: "right" }}>
              100.000 đ
            </Text>
            <Text className="font-bold  mb-2" style={{ textAlign: "right" }}>
              245.000 đ
            </Text>
            <Text
              className="font-bold  mb-2"
              style={{ textAlign: "right", color: status ? "green" : "red" }}
            >
              {status ? "SUCCESS" : "UNPAID"}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-center mx-7 ">
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              opacity: 0.8,
              shadowColor: "orange",
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 50 },
            }}
            className="p-3 flex-1 rounded-xl mr-3"
          >
            <Text className="text-base text-center text-white font-bold">
              Contact
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "red",
              opacity: 0.8,
              shadowColor: "red",
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 50 },
            }}
            className="p-3 flex-1 rounded-xl flex-row align-center items-center justify-center"
          >
            <FontAwesome name="bug" size={18} color="white" />
            <Text className="text-base text-center text-white font-bold ml-3">
              Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default CartScreen;
