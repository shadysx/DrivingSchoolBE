import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Image } from "react-native";
import { GetStatsResponse, Question } from "../interfaces/interfaces";
import { API } from "../constants";
import { useAuth } from "../auth/Auth";

const StatsContext = createContext<StatsContextInterface>({
  state: {
    scores: [],
    mean: 0,
  },
  dispatch: () => {}, // Placeholder dispatch function
  fetchStatsFromApi: () => {}
});

interface StatsContextInterface {
  state: {
    scores: number[];
    mean: number;
  };
  dispatch: React.Dispatch<StatsAction>;
  fetchStatsFromApi: () => void
}

interface StatsAction {
  type: "SET_SCORES_AND_MEAN";
  payload: { scores: [], mean: 0 }
}

const statsReducer = (state, action) => {
    switch (action.type) {
      case "SET_SCORES_AND_MEAN":
        return { ...state, scores: action.payload.scores, mean: action.payload.mean };
      default:
        return state;
    }
  };

export const useStatsContext = (): StatsContextInterface => {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error(
      "useStatsContext must be used within a StatsContextProvider"
    );
  }

  return context;
};

const StatsContextProvider = ({ children }) => {
  const initialState = { questions: [] };
  const [state, dispatch] = useReducer(statsReducer, initialState);
  const [isStatsContextLoading, setIsStatsContextLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const fetchStatsFromApi = async () => {
    try {
      setIsStatsContextLoading(true);
      const response = await fetch(
        API + `quizsummary/getstats?userId=${user.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let responseData: GetStatsResponse = await response.json();
      dispatch({ type: "SET_SCORES_AND_MEAN", payload: { scores: responseData.scores, mean: responseData.mean } });

    } catch (error: any) {
      // setError(error);
    } finally {
      setIsStatsContextLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsFromApi()
  }, []);

  return (
    <StatsContext.Provider value={{ state, dispatch, fetchStatsFromApi }}>
      {children}
    </StatsContext.Provider>
  );
};

export { StatsContext, StatsContextProvider };
