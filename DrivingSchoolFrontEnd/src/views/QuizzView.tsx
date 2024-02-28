import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TimerProgressBar } from "../components/Quizz/TimerProgressBar";
import QuizzSummaryView from "./QuizzSummaryView";
import { Question } from "../interfaces/interfaces";
import { useQuestionsContext } from "../contexts/QuestionsContext";
import { useQuizContext } from "../contexts/QuizContext";

const QuizzView = ({navigation}) => {
  // const [questionCounter, setQuestionCounter] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  const { questionsState } = useQuestionsContext();
  const { questions } = questionsState;

  const { addSummaryElement, state } = useQuizContext();
  const { questionCounter, definedTimer } = state;

  // On user submit
  const handleValidation = () => {
    addSummaryElement(questions[questionCounter], selectedAnswer);
    // Prevent to have an answer already selected 
    setSelectedAnswer(-1);
  };

  // In case of timeout we still need to add the elements
  const handleTimeOut = () => {
    addSummaryElement(questions[questionCounter], selectedAnswer);
    // Prevent to have an answer already selected 
		setSelectedAnswer(-1);
  };

	const isQuizzPlaying: boolean = questionCounter < 50	
  return (
    <View style={{ flex: 1 }}>
      {questions && isQuizzPlaying && (
      <SafeAreaView style={{ flex: 1 }}>
        <>
          <View style={styles.topContainer}>
          <Text style={styles.questionCounter}>
              Question {questionCounter + 1}/50
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
                uri: questions[questionCounter].cacheImageUri,
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
      </SafeAreaView>
      )}
			{!isQuizzPlaying && <QuizzSummaryView navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    marginTop: 0,
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

export default QuizzView;
