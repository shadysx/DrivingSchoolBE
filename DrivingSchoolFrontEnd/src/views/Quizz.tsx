import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Question } from "../interfaces/interfaces";
import { Theme } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import TimerProgressBar from "../components/TimerProgressBar";

const Quizz = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [questionCounter, setQuestionCounter] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [definedTimer] = useState<number>(5)
  const [askedQuestionsNumber] = useState<number>(10)
  const [countdown, setCountdown] = useState<number>(definedTimer)

  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const fetchQuestionsFromApi = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.99:5143/question/getall"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData: Question[] = await response.json();
        setQuestions(responseData);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionsFromApi();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
        let needIncrementAndReset = false;
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1 / definedTimer;
        if (newProgress > 1) {
            needIncrementAndReset = true;
        }
        return newProgress;
      });
      if(needIncrementAndReset){
        setProgress(0);
        setQuestionCounter(prev => prev + 1)
      }

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleValidation = () => {
    // Check if correct answer, increase the score if yes
    if (
      questions !== null &&
      questions[questionCounter].answerIndex == selectedAnswer
    ) {
      setScore((prev) => prev + 1);
    }
    console.log(
      questionCounter,
      questions !== null &&
        questions[questionCounter].answerIndex == selectedAnswer
    );
    setQuestionCounter((prev) => prev + 1);
    setSelectedAnswer(null);
    setCountdown(30);
  };

  //#region Rendering
  const RenderQuizz = () => {
    if (questionCounter === askedQuestionsNumber) {
      return <Text>Recap {score}/10</Text>;
    } else if (questions?.length) {
      return (
        <>
          <View style={styles.topContainer}>
          <View style={styles.progressionContainer}>
          <TimerProgressBar progress={progress}/>
          </View>
            <Text style={styles.questionCounter}>
              Question {questionCounter + 1}/40
            </Text>
            <Image
              style={styles.questionImage}
              source={{
                uri: questions[questionCounter].imageUri,
              }}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.questionText}>
              {questions[questionCounter].text}
            </Text>
            <View style={styles.questionsAnswerButtonsContainer}>
              <View>
                {questions[questionCounter].answers.map((answer, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedAnswer(index)}
                    style={
                      selectedAnswer === index
                        ? styles.questionSelectedAnswerButton
                        : styles.questionAnswerButton
                    }
                  >
                    <Text style={styles.questionAnswerButtonText}>
                      {answer}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => handleValidation()}
                style={styles.questionValidationButton}
              >
                <Text style={styles.questionValidationButtonText}>Valider</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </>
      );
    } else {
      return <Text>No questions available</Text>;
    }
  };
  //#endregion

  return (
    <View style={styles.topContainer}>
        <SafeAreaView style={{ flex: 1 }}>
        <RenderQuizz />
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    marginTop: -50,
    flex: 1,
    zIndex: 2,
    backgroundColor: Theme.white,
    borderRadius: 25
  },
  questionImage: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  questionCounter: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
  },
  questionText: {
    fontSize: 20,
    margin: 20,
    textAlign: "justify",
  },
  questionsAnswerButtonsContainer: {
    flex: 1,
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
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
  },
  questionValidationButton: {
    height: 50,
    backgroundColor: Theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
  },
  questionValidationButtonText: {
    color: "#FFF",
  },
  progressionContainer: {},
  progressBar: {
    // marginLeft: 20,
    // marginRight: 20,
    height: 10,
    borderRadius: 20,
    margin: 10
  },
});

export default Quizz;
