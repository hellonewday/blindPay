import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../themes";

function FruitCardCart({ fruit }) {
  return (
    <View className="flex-row justify-between items-center space-x-5 mb-5">
      <View className="ml-7">
        <TouchableOpacity className="flex-row -mb-10 -ml-6 shadow-lg z-20">
          <Image
            source={fruit.image}
            style={{
              height: 65,
              width: 65,
              shadowColor: fruit.shadow,
              overflow: "visible",
              shadowRadius: 15,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ backgroundColor: fruit.color(0.4), height: 50, width: 50 }}
          className="rounded-2xl flex justify-end items-center"
        ></View>
      </View>
      <View className="flex-1 space-y-1">
        <Text style={{ color: colors.text }} className="text-base font-bold">
          {fruit.name}
        </Text>
        <Text className="text-yellow-500 font-extrabold">{fruit.price} đ</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text>Qty: {fruit.qty}</Text>
      </View>
    </View>
  );
}
export default FruitCardCart;
