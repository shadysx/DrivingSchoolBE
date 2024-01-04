import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { IconButton, ProgressBar, MD3Colors } from "react-native-paper";
import { Theme } from "../constants";
import { useAuth } from "../auth/Auth";
import SettingsMenu from "./SettingsMenu";

const ProfileBanner = ({navigation}) => {
  const { handleLogout, user } = useAuth();
  useEffect(() => {
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.avatarAndTextAndSettingsButtonContainer}>
          <Avatar.Image
            style={styles.avatarContainer}
            size={60}
            source={require('../../assets/avatar1.webp')}
          />
          <View style={styles.avatarTextContainer}>
            <Text style={styles.avatarTextElement}>
              Bienvenue, {user.userName}
            </Text>
            <Text style={[styles.avatarTextElement, styles.additionalText]}>
              Il est temps de te préparer !
            </Text>
          </View>
          <View style={styles.profileBannerSettingsButton}>
            <SettingsMenu navigation={navigation} />
          </View>
        </View>
        <View style={styles.progressionContainer}>
          <ProgressBar
            style={styles.progressBar}
            progress={0.05}
            color={Theme.black}
          />
          <View style={styles.progressionTextContainer}>
            <Text style={{ fontSize: 14, fontWeight: "normal", color: "white" }}>
              Jeune drifteur
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "normal", color: "white" }}
            >
              EXP 10/200
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
