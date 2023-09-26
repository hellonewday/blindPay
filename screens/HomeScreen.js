import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import ScreenWrapper from "../components/screenWrapper";
import { colors } from "../themes";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import randomImage from "../assets/images/randomImage";
import { categories, featuredFruits } from "../constants";
import FruitCard from "../components/FruitCard";
import RecommendCard from "../components/RecommendCard";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const items = [
  {
    id: 1,
    product_name: "Apple",
    price: 60000,
  },
  {
    id: 2,
    product_name: "Grapes",
    price: 21000,
  },
  {
    id: 3,
    product_name: "Orange",
    price: 22000,
  },
  {
    id: 4,
    product_name: "Pear",
    price: 12000,
  },
  {
    id: 5,
    product_name: "Pineapple",
    price: 22000,
  },
  {
    id: 6,
    product_name: "Watermelon",
    price: 12000,
  },
];

function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Oranges");
  const navigation = useNavigation();
  const getHeader = () => {
    return <View />;
  };

  const getFooter = () => {
    return <View />;
  };
  return (
    <ScreenWrapper className="flex-1">
      <ScrollView>
        <View className="flex-row justify-between items-center p-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name="menu" size={26} color="black" />
            </TouchableOpacity>
            <Text
              className={`${colors.heading} pl-3 font-bold text-2 text-2xl shadow-sm`}
            >
              Blind Pay
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity className="flex-row justify-between p-2 px-3 bg-white border border-gray-200 rounded-full bg-orange-500 ">
              <Ionicons name="ios-scan-outline" size={20} color="white" />
              <Text className="text-white font-bold pl-2">Scan QR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 ml-2 rounded-xl bg-orange-100"
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart" size={25} color="orange" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current location */}
        <View>
          <View className="flex-row p-2 px-3">
            <Ionicons name="md-location" size={20} color="red" />
            <Text
              style={{ color: colors.text }}
              className="text-sm font-bold pl-1"
            >
              Vinmart Store, 33 Ward 21 Phu Dien Str
            </Text>
          </View>
        </View>

        {/* Register membership */}
        <View className="flex-row justify-between px-2 items-center bg-white rounded-xl mx-4 mb-4">
          <View>
            <Text className="font-bold text-base">Register Membership</Text>
            <TouchableOpacity
              style={{ width: 100 }}
              className="p-2 px-3 mt-3 bg-white border border-gray-200 rounded-xl bg-purple-500 "
            >
              <Text className="text-white font-bold pl-2">Let's go!</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require("../assets/images/banner.png")}
              className="w-36 h-36"
            />
          </View>
        </View>

        {/* Categories */}
        <View>
          <ScrollView
            horizontal
            className="mt-3 px-5"
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => {
              let isActive = category === activeCategory;
              let textClass = `text-sm ${isActive ? " font-bold" : ""}`;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveCategory(category)}
                  className="mr-8 relative"
                >
                  <Text className={textClass} style={{ color: colors.text }}>
                    {category}
                  </Text>
                  {isActive ? (
                    <Text className="font-extrabold text-orange-400 -mt-3 ml-2">
                      __ _
                    </Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/*Product Carousel*/}
        <View className="mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredFruits.map((fruit, index) => (
              <FruitCard fruit={fruit} key={index} />
            ))}
          </ScrollView>
        </View>
        {/* People also bought */}
        <View className="mt-3 pl-5 space-y-1">
          <Text style={{ color: colors.text }} className="text-xl font-bold">
            People also bought
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ overflow: "visible" }}
          >
            {[...featuredFruits].reverse().map((fruit, index) => {
              return <RecommendCard key={index} fruit={fruit} />;
            })}
          </ScrollView>
        </View>
        {/* Most popular */}
        <View className="mt-3 px-4 space-y-4">
          <View className="flex-row justify-between items-center ">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Most Popular
            </Text>
            <TouchableOpacity>
              <Text>See More</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={items}
              numColumns={2}
              ListHeaderComponent={getHeader}
              ListFooterComponent={getFooter}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              className="mx-1"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity className="bg-white p-3 mb-3 rounded-2xl shadow-sm">
                    <View>
                      <Image
                        source={randomImage()}
                        className="w-36 h-36 mb-2"
                      />
                      <Text className={`${colors.heading} font-bold`}>
                        {item.product_name}
                      </Text>
                      <Text>{item.price.toLocaleString("de-DE")} đ</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* Header */}
    </ScreenWrapper>
  );
}

export default HomeScreen;
