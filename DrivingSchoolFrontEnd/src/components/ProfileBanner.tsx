import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { IconButton, ProgressBar, MD3Colors } from "react-native-paper";
import { Theme } from "../constants";

const ProfileBanner = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.avatarAndTextAndSettingsButtonContainer}>
          <Avatar.Image
            style={styles.avatarContainer}
            size={60}
            source={{
              uri: "data:image/png;base64,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",
            }}
          />
          <View style={styles.avatarTextContainer}>
            <Text style={styles.avatarTextElement}>
              Bon retour à toi, Laurent
            </Text>
            <Text style={[styles.avatarTextElement, styles.additionalText]}>
              Il est temps de te préparer !
            </Text>
          </View>
          <View style={styles.profileBannerSettingsButton}>
            <IconButton
              icon="cog"
              iconColor={"white"}
              size={30}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
        <View style={styles.progressionContainer}>
          <ProgressBar
            style={styles.progressBar}
            progress={0.65}
            color={Theme.primary}
          />
          <View style={styles.progressionTextContainer}>
            <Text style={{ fontWeight: "normal", color: "white" }}>
              Jeune drifteur
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "normal", color: "white" }}
            >
              Chapitre 14/21
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
		backgroundColor: Theme.secondary
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
		paddingBottom: 50
  },
  avatarAndTextAndSettingsButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // pour aligner les éléments à l'extrémité des parents
    marginBottom: 8,
    // padding: 16,
    // backgroundColor: 'blue',
  },
  avatarContainer: {
    marginRight: 16, // ajoute une marge entre l'avatar et le texte
    // backgroundColor: 'green'
  },
  avatarTextContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  avatarTextElement: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  additionalText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "white",
  },
  profileBannerSettingsButton: {
    // backgroundColor: 'red', // ajoutez des styles personnalisés ici
  },
  progressionContainer: {},
  progressBar: {
    // marginLeft: 20,
    // marginRight: 20,
    height: 10,
    borderRadius: 20,
    marginBottom: 3,
  },
  progressionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProfileBanner;
