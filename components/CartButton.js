import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function CartButton({ customStyle }) {
  const navigation = useNavigation();

  return (
    <View style={{position: 'absolute', zIndex: 100, top: 10, right: 20}}>
      <TouchableOpacity
        className="p-2 ml-2 rounded-xl bg-orange-100"
        onPress={() => navigation.navigate("Cart")}
      >
        <Ionicons name="cart" size={25} color="orange" />
      </TouchableOpacity>
    </View>
  );
}

export default CartButton;
