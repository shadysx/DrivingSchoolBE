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
import { TimerProgressBar } from "../components/TimerProgressBar";
import QuizzSummary from "./QuizzSummary";

const Quizz = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [questionCounter, setQuestionCounter] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [score, setScore] = useState<number>(0);
  const [definedTimer] = useState<number>(5);
  const [askedQuestionsNumber] = useState<number>(10);
	// Todo, avoid map.set ...
	/*
		const updateSelectedAnswer = (question, answer) => {
		setQuestionsWithSelectedAnswer(prevMap => {
			const newMap = new Map(prevMap);
			newMap.set(question, answer);
			return newMap;
		});
	};
	*/
	const [questionsWithSelectedAnswers, setQuestionsWithSelectedAnswer] = useState<Map<Question, number> | null>(new Map<Question, number>())

  useEffect(() => {
    console.log("Rerender Quizz");
  });

  useEffect(() => {
    const fetchQuestionsFromApi = async () => {
      console.log("fetching");
      try {
        const response = await fetch(
          "http://localhost:5143/question/getall"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData: Question[] = await response.json();
        setQuestions(responseData);
      } catch (error: any) {
        // setError(error);
      } finally {
        // setLoading(false);
      }
    };
    fetchQuestionsFromApi();
  }, []);

  const handleValidation = () => {
		checkAnswer();
    setQuestionCounter((prev) => prev + 1);
    setSelectedAnswer(-1);
  };

  const handleTimeOut = () => {
		checkAnswer();
    setQuestionCounter((prev) => prev + 1);
		setSelectedAnswer(-1);
  };

	const checkAnswer = () => {
		// Logs
    console.log(
      questionCounter,
      questions !== null &&
        questions[questionCounter].answerIndex == selectedAnswer
    );

		// Add the questions to a map with the associted selected answer so we can compute them in the quizz summary
		if(questions && questionsWithSelectedAnswers){
			questionsWithSelectedAnswers.set(questions[questionCounter], selectedAnswer)
		}
	}

	const isQuizzPlaying: boolean = questionCounter < askedQuestionsNumber	

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {questions && isQuizzPlaying && (
        <>
          <View style={styles.topContainer}>
          <Text style={styles.questionCounter}>
              Question {questionCounter + 1}/40
            </Text>
            <View style={styles.progressionContainer}>
              <TimerProgressBar
                definedTimer={definedTimer}
                questionCounter={questionCounter}
                handleTimeOut={handleTimeOut}
                color={Theme.primary}
              />
            </View>
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
                {
                  questions[questionCounter].answers.map((answer, index) => (
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
      )}
			{!isQuizzPlaying && <QuizzSummary questionsWithSelectedAnswers={questionsWithSelectedAnswers}/>}
    </SafeAreaView>
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
    borderRadius: 25,
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
    backgroundColor: 'black',
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
    margin: 10,
  },
});

export default Quizz;
