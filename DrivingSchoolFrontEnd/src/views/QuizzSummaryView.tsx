import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, Theme } from "../constants";
import QuizzSummaryBoxes from "../components/Quizz/QuizzSummaryBoxes";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Question, QuizzSummary, QuizzSummaryElement } from "../interfaces/interfaces";
import ProfileBanner from "../components/ProfileBanner";
import { useAuth } from "../auth/Auth";

interface QuizzSummaryProps {
  navigation: StackNavigationProp<any, any>;
  questionsWithSelectedAnswers: Map<Question, number> | null;
}

const QuizzSummaryView: React.FC<QuizzSummaryProps> = ({
  navigation,
  questionsWithSelectedAnswers,
}) => {
  const [quizzSummary, setQuizzSummary] = useState<QuizzSummary>();
  const {user} = useAuth();
  const userId = user.id
  const resultText = quizzSummary?.isSuccess
    ? <Text style={{color: Theme.secondary}}>Réussi !</Text>
    : <Text style={{color: "red"}}>Raté...</Text>

  useEffect(() => {
    computeSummaries();
  }, []);

  const computeSummaries = () => {
    let quizzSummaryElements: QuizzSummaryElement[] = [];

    for (const [question, selectedAnswer] of questionsWithSelectedAnswers) {
      quizzSummaryElements.push({
          question: question,
          userAnswerIndex: selectedAnswer,
          isAnswerCorrect: question.answerIndex === selectedAnswer,
      });
    }

    // Score computing
    let score = 0;
    quizzSummaryElements.forEach((element) => {
      // -5 for every serious question that is not answered correctly
      if (!element.isAnswerCorrect && element.question.isSerious) {
        score -= 5;
      }
      // +1 for every question that is answered correctly
      if (element.isAnswerCorrect){
        score += 1;
      }
    });

    const isSuccess = score >= 41;

    const quizzSummary: QuizzSummary = {
      score,
      isSuccess,
      quizzSummaryElements,
      userId 
    };
    setQuizzSummary(quizzSummary);
    postQuizzSummaryToServer(quizzSummary);
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
        <Text style={styles.scoreText}>
           Votre score est de {quizzSummary?.score}/50, {resultText}
        </Text>
      </View>
      <ScrollView style={styles.boxesScrollView}>
        <QuizzSummaryBoxes quizzSummary={quizzSummary} navigation={navigation}/>
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
