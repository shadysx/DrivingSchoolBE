import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, Theme } from "../constants";
import QuizzSummaryBoxes from "../components/Quizz/QuizzSummaryBoxes";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "../components/LoadingScreen";
import { useQuestionsContext } from "../contexts/QuestionsContext";
import { useQuizContext } from "../contexts/QuizContext";

interface QuizzSummaryProps {
  navigation: StackNavigationProp<any, any>;
}

const QuizzSummaryView: React.FC<QuizzSummaryProps> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchQuestionsFromApi } = useQuestionsContext();
  const { state, resetQuiz } = useQuizContext();
  const { quizSummary } = state;
  const resultText = quizSummary?.isSuccess
    ? <Text style={{color: Theme.secondary}}>Réussi !</Text>
    : <Text style={{color: "red"}}>Raté...</Text>

  useEffect(() => {
    // TODO Move this to quizContext
    fetchQuestionsFromApi();
  }, []);

  const handleNewQuiz = () => {
    resetQuiz();
    navigation.navigate("QuizzView");
  }
  

  return isLoading ? <LoadingScreen/> : (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topPanel}>
      <View>
        <Text style={styles.scoreText}>
           Votre score est de {quizSummary?.score}/50, {resultText}
        </Text>
      </View>
      <ScrollView style={styles.boxesScrollView}>
        <QuizzSummaryBoxes quizzSummary={quizSummary} navigation={navigation}/>
      </ScrollView>
      </View>
      <View style={styles.bottomPanel}>
      <View style={styles.buttomButtonsContainer}>
        <Button
          style={styles.button}
          icon="home"
          mode="elevated"
          textColor="white"
          buttonColor={Theme.black}
          onPress={() => navigation.navigate("HomeView")}
        >
          Accueil
        </Button>
        <Button
          style={styles.button}
          icon="restart"
          mode="elevated"
          textColor="black"
          buttonColor={Theme.secondary}
          onPress={handleNewQuiz}
        >
          Encore
        </Button>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white
  },
  bottomPanel: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 2,
    // marginTop: -70,
    borderRadius: 20,
     // Shadow for iOS
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.75,
     shadowRadius: 3.84,
     // Elevation for Android
     elevation: 5,
  },
  topPanel: {
    height: "90%",
    marginLeft: 5, 
    marginRight: 5
  },
  scoreText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: "left",
    marginVertical: 5,
  },
  boxesScrollView: {

  },
  buttomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  button: {
    width: "45%",
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuizzSummaryView;
