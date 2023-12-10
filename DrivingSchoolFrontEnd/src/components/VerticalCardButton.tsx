import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Theme } from "../constants";

const VerticalCardButton: React.FC<any> = ({
  svgComponent,
  title,
  subTitle,
  color,
}) => {
  return (
    <TouchableOpacity style={[styles.homeButton, { backgroundColor: color }]}>
      {svgComponent}
      <View>
        <Text style={styles.homeButtonText}>{title}</Text>
        <Text style={styles.homeButtonAlternativeText}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeButton: {
    width:
      Dimensions.get("window").width / 3 - Dimensions.get("window").width / 20,
    alignItems: "center",
    justifyContent: "space-between",
    height: 260,
    borderRadius: 15,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  homeButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  homeButtonAlternativeText: {
    color: "black",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  homeButtonImage: {},
});

export default VerticalCardButton;
