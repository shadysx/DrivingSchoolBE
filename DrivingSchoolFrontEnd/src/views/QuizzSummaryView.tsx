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
    ? "Le test est réussi"
    : "Malheureusement c'est un echec";

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
    <View style={styles.container}>
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
          textColor="white"
          buttonColor={Theme.secondary}
          onPress={() => navigation.replace("QuizzView")}
        >
          Encore
        </Button>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomPanel: {
    flex: 1,
    backgroundColor: Theme.white,
    justifyContent: 'flex-end',
    zIndex: 2,
    marginTop: -20,
    borderRadius: 25
  },
  topPanel: {
    height: "95%",
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
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  quizzSummaryElementBox: {
    width: "25%", // For 4 images per row
  },
  boxesScrollView: {

  },
  buttomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    width: "35%",
  },
});

export default QuizzSummaryView;
