import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatsView from './StatsView'
import { API } from '../../constants';
import { Question, QuizzSummary } from '../../interfaces/interfaces';
import { useAuth } from '../../auth/Auth';
import LoadingScreen from '../../components/LoadingScreen';
import { useStatsContext } from '../../contexts/StatsContext';


const StatsViewContainer = ({navigation}) => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const {state} = useStatsContext();
  const {mean, scores} = state;

  useEffect(() => {
    console.log("mean", mean, "scores", scores)
  })

  return isLoading ? <LoadingScreen/> : <StatsView scores={scores} mean={mean}/>
}

export default StatsViewContainer