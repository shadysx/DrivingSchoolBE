import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { QuizzSummaryElement } from '../interfaces/interfaces'
import { RouteProp } from '@react-navigation/native';

// interface QuizzSummaryDetailViewProps {
//   quizzSummaryElement?: QuizzSummaryElement | null
// }


interface QuizzSummaryDetailViewProps {
  route: RouteProp<{ params: { element: QuizzSummaryElement } }, 'params'>;
}

const QuizzSummaryDetailView: React.FC<QuizzSummaryDetailViewProps> = ({ route }) => {
  const quizzSummaryElement = route.params.element
  useEffect(() => {
    
  },[])
  return (
    <View style={styles.container}>
      <Text>{quizzSummaryElement?.question?.text}</Text>
      <Text>{quizzSummaryElement.question.answers}</Text>
      <Text>Vous avez choisi la réponse : {quizzSummaryElement.question.answers[quizzSummaryElement.userAnswerIndex]}</Text>
      <Text>Votre réponse est {quizzSummaryElement.isAnswerCorrect ? "acceptée !" : "refusée !"}</Text>
      <Text>La réponse était {quizzSummaryElement.question.answers[quizzSummaryElement.question.answerIndex]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
    },
    image: {
      width: 200,
      height: 200,
    },
    answer: {
      fontSize: 16,
    },
    correct: {
      color: 'green',
    },
    userAnswer: {
      color: 'red',
    },
    explanation: {
      marginTop: 20,
      fontSize: 18,
    },
});

export default QuizzSummaryDetailView