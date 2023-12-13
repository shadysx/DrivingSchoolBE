import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Question } from "../interfaces/interfaces";
import { QuizzSummaryElement } from "../models/QuizzSummaryElement";
import { QuizzSummary } from "../models/QuizzSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, Theme } from "../constants";
import { User } from "../models/User";
import QuizzSummaryBoxes from "../components/Quizz/QuizzSummaryBoxes";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

interface QuizzSummaryProps {
  navigation: StackNavigationProp<any, any>;
  questionsWithSelectedAnswers: Map<Question, number> | null;
}

const QuizzSummaryView: React.FC<QuizzSummaryProps> = ({
  navigation,
  questionsWithSelectedAnswers,
}) => {
  const [quizzSummary, setQuizzSummary] = useState<QuizzSummary>();
  const resultText = quizzSummary?.IsSuccess
    ? <Text>Le test est réussi</Text>
    : <Text>Le test est raté</Text>

  useEffect(() => {
    computeSummaries();
  }, []);

  const computeSummaries = () => {
    let summaryElements: QuizzSummaryElement[] = [];

    for (const [question, selectedAnswer] of questionsWithSelectedAnswers) {
      summaryElements.push(
        new QuizzSummaryElement(
          question.text,
          question.answerIndex,
          selectedAnswer,
          question.imageUri
        )
      );
    }

    const _quizzSummary: QuizzSummary = new QuizzSummary(summaryElements);
    setQuizzSummary(_quizzSummary);
    postQuizzSummaryToServer(_quizzSummary);
  };

  const postQuizzSummaryToServer = async (quizzSummary: QuizzSummary) => {
    try {
      const result = await axios.post(
        API + "QuizSummary/Create",
        JSON.stringify(quizzSummary),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topPanel}>
      <View>
        <Text style={styles.scoreText}>{resultText}</Text>
        <Text style={styles.scoreText}>
          Votre score est de {quizzSummary?.Score}/40
        </Text>
      </View>
      <ScrollView style={styles.boxesScrollView}>
        <QuizzSummaryBoxes quizzSummary={quizzSummary} />
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
          onPress={() => navigation.replace("QuizzView")}
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
