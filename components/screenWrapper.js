import { View, Text, StatusBar, Platform, StyleSheet } from "react-native";
import React from "react";

export default function ScreenWrapper({ children }) {
  let statusBarHeight = StatusBar.currentHeight
    ? StatusBar.currentHeight
    : Platform.OS == "ios"
    ? 30
    : 0;
  return (
    <View style={{ paddingTop: Platform.OS == "ios" ? 30 : 0 }}>
      <StatusBar style="light" />
      {children}
    </View>
  );
}
