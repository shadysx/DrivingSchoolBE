import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Theme } from "../constants";

const LoadingScreen = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Theme.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
