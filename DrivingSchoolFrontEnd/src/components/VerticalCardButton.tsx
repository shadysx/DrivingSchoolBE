import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Theme } from "../constants";

const VerticalCardButton : React.FC<any> = ({svgComponent, title, subTitle, color}) => {
  return (
      <TouchableOpacity style={[styles.homeButton, {backgroundColor: color}]}>
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
        width: Dimensions.get("window").width / 3 - Dimensions.get("window").width / 20,
        alignItems: "center",
        justifyContent: "space-between",
        height: 260,
        borderRadius: 15,
      },
      homeButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 18,
      },
      homeButtonAlternativeText: {
        color: "white",
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 50,
        marginLeft: 5,
        marginRight: 5,
      },
      homeButtonImage: {
      },
})

export default VerticalCardButton;
