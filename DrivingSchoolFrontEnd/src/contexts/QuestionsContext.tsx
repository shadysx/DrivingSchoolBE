import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Image } from "react-native";
import { Question, QuizzSummary } from "../interfaces/interfaces";
import { API } from "../constants";
import cacheImage from "../Utils";
import axios from "axios";
import navigation from "../navigation/navigation";
import { useStatsContext } from "./StatsContext";
import { useAuth } from "../auth/Auth";

const QuestionsContext = createContext<QuestionsContextInterface>({
  questionsState: {
    questions: [],
  },
  dispatch: () => {}, // Placeholder dispatch function
  fetchQuestionsFromApi: () => {}, // Placeholder reloadQuestions function
});

interface QuestionsContextInterface {
  questionsState: {
    questions: Question[];
  };
  dispatch: React.Dispatch<QuestionsAction>;
  fetchQuestionsFromApi: () => void; // Updated to a function that takes no arguments
}

interface QuestionsAction {
  type: "SET_QUESTIONS";
  payload: Question[];
}

const questionsReducer = (questionsState, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...questionsState, questions: action.payload };
      break;

      return questionsState;
  }
};

export const useQuestionsContext = (): QuestionsContextInterface => {
  const context = useContext(QuestionsContext);

  if (!context) {
    throw new Error(
      "useQuestionsContext must be used within a QuestionsContextProvider"
    );
  }

  return context;
};

const QuestionsContextProvider = ({ children }) => {
  const initialState = { questions: [] };
  const [questionsState, dispatch] = useReducer(questionsReducer, initialState);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState<boolean>(false);

  useEffect(() => {
    const preloadImagesInCache = async () => {
      try {
        if(questionsState.questions == null || questionsState.questions.length == 0){
          return
        }

      // Use Promise.all to await all cacheImage calls
      await Promise.all(questionsState.questions.map(async (question: Question) => {
        question.cacheImageUri = await cacheImage(question.imageUri);
      }));

      }
      catch (error){
  
      }
      finally {
        console.log("[QuestionsContextProvider]: Images preloading done");
      }
    }

    preloadImagesInCache()
    // preloadImages();
  }, [questionsState]);





  const fetchQuestionsFromApi = async () => {
    setIsQuestionsLoading(true);
    try {
      const response = await fetch(API + "question/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let responseData: Question[] = await response.json();
      responseData = responseData.sort(() => Math.random() - 0.5);
      dispatch({ type: "SET_QUESTIONS", payload: responseData });
      console.log("Fetching questions in the questions context");
    } catch (error: any) {
      // setError(error);
    } finally {
      setIsQuestionsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsFromApi();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{ questionsState, dispatch, fetchQuestionsFromApi}}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContext, QuestionsContextProvider };
