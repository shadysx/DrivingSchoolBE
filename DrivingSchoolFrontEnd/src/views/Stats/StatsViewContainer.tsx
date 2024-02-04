import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatsView from './StatsView'
import { API } from '../../constants';
import { Question, QuizzSummary } from '../../interfaces/interfaces';
import { useAuth } from '../../auth/Auth';

const StatsViewContainer = ({navigation}) => {
  const [quizzSummaries, setQuizzSummaries] = useState<QuizzSummary[]>()
  const [scores, setScores] = useState<number[]>()
  const {user} = useAuth()



  // TODO, create an endpoint to get only the user related summaryies
  useEffect(() => {
    const fetchQuestionsSummariesFromApi = async () => {
      console.log("fetching");
      try {
        const response = await fetch(
          API + "quizsummary/getall"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let responseData: QuizzSummary[] = await response.json();
        responseData = responseData.filter(rd => rd.userId == user.id);
        let scoresRaw = responseData.map(qs => qs.score)
        setQuizzSummaries(responseData);
        setScores(scoresRaw)
      } catch (error: any) {
        // setError(error);
      } 
    };
    fetchQuestionsSummariesFromApi();
  },[]);

  return <StatsView scores={scores}/>
}

export default StatsViewContainer