import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Image } from "react-native";
import {
  Question,
  QuizzSummary,
  QuizzSummaryElement,
} from "../interfaces/interfaces";
import { API } from "../constants";
import { useAuth } from "../auth/Auth";
import cacheImage from "../Utils";
import { useStatsContext } from "./StatsContext";
import axios from "axios";

const initialState: StateType = {
  quizSummary: {
    quizzSummaryElements: [],
    score: 0,
    isSuccess: false,
    userId: 0,
  },
  questionCounter: 0,
  definedTimer: 30,
};

const QuizContext = createContext<QuizContextInterface>({
  state: initialState,
  dispatch: () => {}, // Placeholder dispatch function
  addSummaryElement: () => {},
  resetQuiz: () => {}, // Placeholder reloadQuestions function
});

interface QuizContextInterface {
  state: StateType
  dispatch: React.Dispatch<AddSummaryElementAction>;
  addSummaryElement: (question: Question, userAnswerIndex: number) => void;
  resetQuiz: () => void;
}

const enum REDUCER_ACTION_TYPE {
  ADD_SUMMARY_ELEMENT,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  RESET_QUIZ
}

interface AddSummaryElementAction {
  type: REDUCER_ACTION_TYPE;
  payload: QuizzSummaryElement;
}

interface StateType {
  quizSummary: QuizzSummary,
  questionCounter: number,
  definedTimer: number
}

const quizReducer = (state: typeof initialState, action) => {
  switch (action.type) {
    case "ADD_SUMMARY_ELEMENT":
      return {
        ...state, // Spread the existing state to avoid mutation
        questionCounter: state.questionCounter + 1, // Increment question counter
        quizSummary: {
          ...state.quizSummary, // Spread the existing quizSummary to avoid mutation
          isSuccess: state.quizSummary.score >= 41,
          quizzSummaryElements: [
            ...(state.quizSummary?.quizzSummaryElements || []),
            action.payload,
          ], // Add the new element to the elements array
        },
      };
      break;
    case "INCREMENT_SCORE":
      console.log("INC")
      console.log(state)
      return {
        ...state,
        quizSummary: {
          ...state.quizSummary,
          score: state.quizSummary.score + 1,
        },
      };
      break
    case "DECREMENT_SCORE":
      console.log("DEC")
      return {
        ...state,
        quizSummary: {
          ...state.quizSummary,
          score: state.quizSummary.score - 5,
        },
      };
      break
    case "RESET_QUIZ":
      console.log("reseting quiz", state);
      return initialState;
    default:
      return state;
  }
};

export const useQuizContext = (): QuizContextInterface => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error(
      "useQuizContext must be used within a UseQuizContextProvider"
    );
  }

  return context;
};

const QuizContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { user } = useAuth();

  const addSummaryElement = async (
    question: Question,
    userAnswerIndex: number
  ) => {
    const newSummaryElement: QuizzSummaryElement = {
      question,
      userAnswerIndex,
      isAnswerCorrect: userAnswerIndex == question.answerIndex,
    };

    computeScore(newSummaryElement);
    dispatch({ type: "ADD_SUMMARY_ELEMENT", payload: newSummaryElement });
  };

  const { fetchStatsFromApi } = useStatsContext();

const postQuizSummaryToServer = async (quizSummary: QuizzSummary) => {
  try {
    quizSummary.userId = user.id;
    const result = await axios.post(
      API + "QuizSummary/Create",
      JSON.stringify(quizSummary),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error making POST request:", error);
  } finally {
    fetchStatsFromApi();
  }
};

  // Called on every element added
  const computeScore = (quizSummaryElement: QuizzSummaryElement) => {
    // -5 for every serious question that is not answered correctly
    if (
      !quizSummaryElement.isAnswerCorrect && quizSummaryElement.question.isSerious
    ) {
      dispatch({ type: "DECREMENT_SCORE" });
    }
    // +1 for every question that is answered correctly
    if (quizSummaryElement.isAnswerCorrect) {
      dispatch({ type: "INCREMENT_SCORE" });
    }
    // if wrong answer just do nothing
  };

  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  useEffect(() => {
    // Check if question counter is 50 and navigate accordingly
    if (state.questionCounter === 50) {
      console.log('sending this :', JSON.stringify(state.quizSummary, null, 4))
      postQuizSummaryToServer(state.quizSummary)
    }
  }, [state.questionCounter]);

  useEffect(() => {console.log("IP = ", API)}, [state]);

  return (
    <QuizContext.Provider
      value={{ state, dispatch, addSummaryElement, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
