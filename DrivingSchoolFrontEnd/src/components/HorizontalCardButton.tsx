import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Theme } from "../constants";

const HorizontalCardButton : React.FC<any> = ({svgComponent, isComingSoon}) => {
  return (
        <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={[styles.homeButton, {opacity: isComingSoon ? 0.4 : 1}]} disabled={isComingSoon} >
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
      {isComingSoon && (
            <View style={[styles.comingSoonBadge]}>
              <Text style={styles.comingSoonText}>Bientôt disponible</Text>
            </View>
      )}
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
        backgroundColor: 'white',
                // Shadow for iOS
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                // Elevation for Android
                elevation: 5,
           
      },
      homeButtonText: {
        marginLeft: 24,
        color: "black",
        fontWeight: "bold",
        fontSize: 35,
      },
      homeButtonAlternativeText: {
        marginLeft: 30,
        color: "black",
        fontSize: 14,
      },
      homeButtonImage: {
        marginRight: 50,
      },
      comingSoonBadge: {
        position: "absolute",
        top: 10,
        backgroundColor: Theme.secondary,
        padding: 5,
        borderRadius: 5,
        zIndex: 2,
        opacity: 1
      },
      comingSoonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 10,
      },
})

export default HorizontalCardButton;
