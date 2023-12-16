import { View, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  Icon,
} from "react-native-paper";
import { Switch } from "react-native-paper";
import ProfileBanner from "../components/ProfileBanner";
import { Theme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import Learn from "../../assets/learn.svg";
import Chart from "../../assets/chart.svg";
import Options from "../../assets/settings.svg";
import Like from "../../assets/like.svg";
import HorizontalCardButton from "../components/HorizontalCardButton";
import VerticalCardButton from "../components/VerticalCardButton";
import { useAuth } from "../auth/Auth";

const HomeView: React.FC<any> = ({ navigation }) => {
  const [visible, setVisible] = React.useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ProfileBanner />
      <View style={styles.bottomContainer}>
        <View style={styles.homeButtonsContainer}>
          <HorizontalCardButton
            svgComponent={
              <Learn
                width={"50%"}
                height={"70%"}
                style={styles.homeButtonImage}
              />
            }
          />
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Plus</Text>
        </View>
        <View style={styles.homeVerticalButtonsContainer}>
          <VerticalCardButton
            title="Stats"
            subTitle="Consulte ta progression"
            color={"white"}
            svgComponent={
              <Chart
                width={"90%"}
                height={"70%"}
                style={styles.homeVerticalButtonImage}
              />
            }
          />
          <VerticalCardButton
            title="Favoris"
            subTitle="Consulte les questions sauvegardées"
            color={"white"}
            svgComponent={
              <Like
                width={"90%"}
                height={"70%"}
                style={styles.homeVerticalButtonImage}
              />
            }
          />
          <VerticalCardButton
            title="Options"
            subTitle="Change les paramètres à ta guise"
            color={"white"}
            svgComponent={
              <Options
                width={"90%"}
                height={"70%"}
                style={styles.homeVerticalButtonImage}
              />
            }
          />
        </View>
      </View>
      <View
          style={styles.startExamButtonContainer}
        >
          <Button
            style={styles.startExamButton}
            icon="steering"
            mode="elevated"
            textColor="white"
            buttonColor={Theme.black}
            onPress={() => navigation.navigate("QuizzView")}
          >
            Commencer un examen
          </Button>
        </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Bienvenue sur DrivingSchoolBelgium</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Ici tu vas pouvoir choisir ce que tu veux faire
            </Text>
            <Text>
              Pour l'instant il n'y a que le mode simulation d'examen qui est
              disponible mais de nombreuses fonctionnalités comme la théorie,
              les examen ciblés, la progressions et bien d'autres sont sur le
              point de voir le jour!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};
export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  bottomContainer: {
    backgroundColor: Theme.white,
    flex: 1,
    zIndex: 2,
    marginTop: -50,
    borderRadius: 25,
    alignItems: "center",
  },
  heading: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  headingText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
  },
  homeText: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff",
  },
  homeButtonsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  homeVerticalButtonsContainer: {
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeButtonImage: {
    marginRight: 50,
  },
  homeVerticalButtonImage: {},
  startExamButtonContainer: {
    alignItems: 'center',
  }
  ,
  startExamButton: {
    width: "70%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  }
});
