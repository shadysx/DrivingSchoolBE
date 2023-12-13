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
import { StackNavigationProp } from '@react-navigation/stack';

interface QuizzSummaryProps {
  navigation: StackNavigationProp<any, any>
  questionsWithSelectedAnswers: Map<Question, number> | null;
};

const QuizzSummaryView: React.FC<QuizzSummaryProps> = ({
  navigation,
  questionsWithSelectedAnswers,
}) => {
  const [score, setScore] = useState(0);
  const [questionsAmount, setQuestionsAmount] = useState(0);
  const [quizzSummary, setQuizzSummary] = useState<QuizzSummary>();
  const resultText = quizzSummary?.IsSuccess ? "Le test est réussi" : "Malheureusement c'est un echec";

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
          selectedAnswer
        )
      );
    }

    console.log("len");
    console.log(summaryElements.length);
    const _quizzSummary: QuizzSummary = new QuizzSummary(summaryElements);
    setQuestionsAmount(summaryElements.length);
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
      <Text style={styles.scoreText}>Votre score est de {quizzSummary?.Score}/40</Text>
      <ScrollView style={styles.boxesScrollView}>
        <QuizzSummaryBoxes quizzSummary={quizzSummary} />
        {/* Add other components here if necessary */}
      </ScrollView>
      <Text style={styles.scoreText}>{resultText}</Text>
      <Button
            icon="steering"
            mode="elevated"
            textColor="white"
            buttonColor={Theme.black}
            onPress={() => navigation.navigate("HomeView")}
          >
            Revenir à l'accueil
          </Button>
          <Button
            icon="steering"
            mode="elevated"
            textColor="white"
            buttonColor={Theme.secondary}
            onPress={() => navigation.replace("QuizzView")}
          >
          Recommencer 
          </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreText: {
    textAlign: 'center',
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
    padding: 5, // Optional for spacing
  },
  image: {
    width: "100%",
    height: 100, // Set a fixed height or make it responsive
    resizeMode: "cover", // To maintain aspect ratio
    borderWidth: 5, // Set the border width
    // borderColor is set dynamically based on the answer correctness
  },
  boxesScrollView: {
    maxHeight: '60%'
  }
});

export default QuizzSummaryView;
