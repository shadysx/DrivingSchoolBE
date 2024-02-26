import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Image } from "react-native";
import { Question } from "../interfaces/interfaces";
import { API } from "../constants";

const QuestionsContext = createContext<QuestionsContextInterface>({
  state: {
    questions: [],
  },
  dispatch: () => {}, // Placeholder dispatch function
  fetchQuestionsFromApi: () => {}, // Placeholder reloadQuestions function
});

interface QuestionsContextInterface {
  state: {
    questions: Question[];
  };
  dispatch: React.Dispatch<QuestionsAction>;
  fetchQuestionsFromApi: () => void; // Updated to a function that takes no arguments
}

interface QuestionsAction {
  type: "SET_QUESTIONS";
  payload: Question[];
}

const questionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };
    default:
      return state;
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
  const [state, dispatch] = useReducer(questionsReducer, initialState);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState<boolean>(false);

  useEffect(() => {
    const preloadImages = async () => {
      setIsQuestionsLoading(true);
      console.log("preloading images");
      try {
        const promises = state.questions.map(async (question) => {
          if (question.imageUri) {
            await Image.prefetch(question.imageUri);
          }
        });

        await Promise.all(promises);
        console.log("[QuestionsContextProvider]: Images preloading done");
      } catch (error) {
        console.error("Error preloading images:", error);
        // Handle error as needed
      } finally {
        setIsQuestionsLoading(false);
      }
    };

    preloadImages();
  }, [state]);

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
      value={{ state, dispatch, fetchQuestionsFromApi }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContext, QuestionsContextProvider };
