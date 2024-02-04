import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatsView from './StatsView'
import { API } from '../../constants';
import { Question, QuizzSummary } from '../../interfaces/interfaces';
import { useAuth } from '../../auth/Auth';

const StatsViewContainer = ({navigation}) => {
  const [quizzSummaries, setQuizzSummaries] = useState<QuizzSummary[]>()
  const [scores, setScores] = useState<number[]>()
  const [mean, setMean] = useState<number>()

  const {user} = useAuth()

  useEffect(() => {
    console.log('mean', mean)
  })

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
        ComputeMeanForLastSummaries(scoresRaw);

      } catch (error: any) {
        // setError(error);
      } 
    };
    fetchQuestionsSummariesFromApi();
  },[]);

  // Called when fetching summaries, will replace the negative numbers with 0's for the score and compute the mean
  const ComputeMeanForLastSummaries = (scoresRaw: number[]) => {
    scoresRaw = scoresRaw?.map(score => score < 0 ? 0 : score)  
      
    if(scores?.length >= 20){
      scoresRaw = scoresRaw?.slice(-20);
    }
    else {
      scoresRaw = scoresRaw?.slice(-scores?.length);
    }
  
    const sum = scoresRaw?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const mean = parseFloat((sum / scoresRaw?.length).toFixed(2))
    setScores(scoresRaw)
    setMean(mean)
  }

  return <StatsView scores={scores} mean={mean}/>
}

export default StatsViewContainer