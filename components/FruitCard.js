import React, { Component, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function FruitCard({ fruit }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View
      style={{ width: 270, borderRadius: 40, backgroundColor: fruit.color(1) }}
      className="mx-5"
    >
      <View className="flex-row justify-end">
        <TouchableOpacity
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          className="p-3 rounded-full mr-4 mt-4"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <AntDesign
            name="heart"
            size={25}
            color={isFavorite ? fruit.shadow : "white"}
          />
        </TouchableOpacity>
      </View>
      <View
        className="flex-row justify-center"
        style={{
          shadowColor: fruit.shadow,
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 50 },
          shadowOpacity: 0.6,
        }}
      >
        <Image source={fruit.image} style={{ width: 210, height: 210 }} />
      </View>
      <View className="ml-4 my-4 ">
        <Text className="font-bold  text-xl text-white shadow">
          {fruit.name}
        </Text>
        <Text className="font-bold text-lg text-white shadow tracking-wide">
          {fruit.price} đ
        </Text>
      </View>
    </View>
  );
}
