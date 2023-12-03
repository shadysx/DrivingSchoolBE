import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Theme } from "../constants";

const HorizontalCardButton : React.FC<any> = ({svgComponent}) => {
  return (
    <View>
      <TouchableOpacity style={styles.homeButton}>
        <View>
          <Text style={styles.homeButtonText}>Théorie</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.homeButtonAlternativeText}>
              Commencer maintenant
            </Text>
          </View>
        </View>
        {svgComponent}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    homeButton: {
        flexDirection: "row",
        width: Dimensions.get("window").width - Dimensions.get("window").width / 12,
        alignItems: "center",
        justifyContent: "space-between",
        height: 130,
        borderRadius: 15,
        backgroundColor: Theme.secondary,
      },
      homeButtonText: {
        marginLeft: 24,
        color: "white",
        fontWeight: "bold",
        fontSize: 35,
      },
      homeButtonAlternativeText: {
        marginLeft: 30,
        color: "white",
        fontSize: 14,
      },
      homeButtonImage: {
        marginRight: 50,
      },
})

export default HorizontalCardButton;
