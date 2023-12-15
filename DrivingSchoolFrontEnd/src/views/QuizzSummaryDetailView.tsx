import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { QuizzSummaryElement } from '../models/QuizzSummaryElement';

interface QuizzSummaryDetailViewProps {
  quizzSummaryElement?: QuizzSummaryElement | null
}

const QuizzSummaryDetailView: React.FC<QuizzSummaryDetailViewProps> = ({ quizzSummaryElement }) => {
  return (
    <View style={styles.container}>
      <Text>Hella</Text>
      <Text>{quizzSummaryElement?.CorrectAnswerIndex}</Text>
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