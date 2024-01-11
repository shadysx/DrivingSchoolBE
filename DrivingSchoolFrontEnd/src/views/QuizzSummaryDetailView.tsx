import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { QuizzSummaryElement } from "../interfaces/interfaces";
import { RouteProp } from "@react-navigation/native";
import { TimerProgressBar } from "../components/Quizz/TimerProgressBar";
import { Theme } from "../constants";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


interface QuizzSummaryDetailViewProps {
  route: RouteProp<{ params: { element: QuizzSummaryElement } }, "params">;
}

const QuizzSummaryDetailView: React.FC<QuizzSummaryDetailViewProps> = ({
  route,
}) => {
  const quizzSummaryElement: QuizzSummaryElement = route.params.element;

  const getButtonStyle = (
    quizzSummaryElement: QuizzSummaryElement,
    index: number
  ) => {
    const isUserAnswer = quizzSummaryElement.userAnswerIndex === index;
    const isCorrectAnswer = quizzSummaryElement.question.answerIndex === index;

    if (isUserAnswer && isCorrectAnswer) {
      return { ...styles.questionAnswerButton, backgroundColor: "green" };
    } else if (isUserAnswer) {
      return { ...styles.questionAnswerButton, backgroundColor: "red" };
    } else if (isCorrectAnswer) {
      return { ...styles.questionAnswerButton, backgroundColor: "green" };
    } else {
      return styles.questionAnswerButton;
    }
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.topContainer}>
        <Image
          style={styles.questionImage}
          source={{
            uri: quizzSummaryElement.question.imageUri,
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.questionText}>
          {quizzSummaryElement.question.text}
        </Text>
        <View style={styles.questionsAnswerButtonsContainer}>
          <View>
            {quizzSummaryElement.question.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={getButtonStyle(quizzSummaryElement, index)}
              >
                <Text style={styles.questionAnswerButtonText}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ScrollView style={styles.explanationContainer}>
          <Text style={styles.answerExplanation}>
            {
              (quizzSummaryElement.question.explanation !== null 
                  ? quizzSummaryElement.question.explanation
                  : "Pas encore d'explication pour cette question, si vous avez une erreur à signaler n'hésitez pas a nous contacter (Accueil => Paramètres => Contact)")
            }
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {},
  bottomContainer: {
    marginTop: -20,
    zIndex: 2,
    backgroundColor: Theme.white,
    borderRadius: 25,
    flex: 1
  },
  questionImage: {
    width: Dimensions.get("window").width,
    height: 300,
    resizeMode: 'cover', 
  },
  questionCounter: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
  },
  questionText: {
    fontSize: 20,
    margin: 20,
  },
  questionsAnswerButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionAnswerButton: {
    height: 50,
    backgroundColor: Theme.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
  },
  questionAnswerButtonText: {
    color: "#FFF",
    margin: 5,
  },
  questionSelectedAnswerButton: {
    height: 50,
    backgroundColor: "green",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
  },
  questionValidationButton: {
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
  },
  questionValidationButtonText: {
    color: "#FFF",
  },
  explanationContainer: {
    margin: 15,
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "white",
    flex: 1
  },
  answerExplanation: {
    margin: 10,
    color: "#222", // Lighter color
    fontFamily: "System", // Use the system font
    fontWeight: "200", // Thinner weight
    fontSize: 14, // Smaller size
  },
});

export default QuizzSummaryDetailView;
