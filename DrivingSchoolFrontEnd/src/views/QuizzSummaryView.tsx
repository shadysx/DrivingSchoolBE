import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Question } from "../interfaces/interfaces";
import { QuizzSummaryElement } from "../models/QuizzSummaryElement";
import { QuizzSummary } from "../models/QuizzSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../constants";
import { User } from "../models/User";

type QuizzSummaryProps = {
  questionsWithSelectedAnswers: Map<Question, number> | null;
};

const QuizzSummaryView: React.FC<QuizzSummaryProps> = ({
  questionsWithSelectedAnswers,
}) => {
  const [score, setScore] = useState(0);
  const [questionsAmount, setQuestionsAmount] = useState(0);
  const [quizzSummary, setQuizzSummary] = useState<QuizzSummary>();

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

    const _quizzSummary: QuizzSummary = new QuizzSummary(summaryElements);
    console.log("quizSummary", _quizzSummary);
    console.log("score", _quizzSummary?.Score);

    setQuestionsAmount(summaryElements.length);
    setQuizzSummary(_quizzSummary);

    postQuizzSummaryToServer(_quizzSummary);
  };

  const postQuizzSummaryToServer = async (quizzSummary: QuizzSummary) => {
    // Build an array of QuizzSummaryElement objects
    const quizzSummaryElements = quizzSummary.QuizzSummaryElements.map(
      (element) => {
        return {
          questionText: element.QuestionText,
          correctAnswerIndex: element.CorrectAnswerIndex,
          userAnswerIndex: element.UserAnswerIndex,
          isAnswerCorrect: element.IsAnswerCorrect,
        };
      }
    );
    const objectToSend = {
      score: quizzSummary.Score,
      quizzSummaryElements: quizzSummary.QuizzSummaryElements,
    };
    console.log("tosend", JSON.stringify(quizzSummary, null, 4));
    try {
      const result = await axios.post(
        API + "QuizSummary/Create",
        JSON.stringify(objectToSend),
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
      <Text style={styles.scoreText}>
        Votre score est : {quizzSummary?.Score}/{questionsAmount}
      </Text>
      {quizzSummary?.QuizzSummaryElements.map((question, index) => {
        return (
          <Text style={styles.questionText} key={index}>
            {question.QuestionText} --{" "}
            {question.IsAnswerCorrect ? "Vrai" : "Faux"}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: "left",
    marginVertical: 5,
  },
});

export default QuizzSummaryView;
