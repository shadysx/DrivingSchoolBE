import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Question } from '../interfaces/interfaces';
import { QuestionSummary } from '../models/QuestionSummary';

type QuizzSummaryProps = {
    questionsWithSelectedAnswers: Map<Question, number> | null;
};

const QuizzSummary: React.FC<QuizzSummaryProps> = ({ questionsWithSelectedAnswers }) => {
    const [score, setScore] = useState(0);
    const [questionsAmount, setQuestionsAmount] = useState(0);
    const [questionsSummaries, setQuestionsSummaries] = useState<QuestionSummary[]>([]);

    useEffect(() => {
        computeSummaries();
    }, []);

    const computeSummaries = () => {
        if (questionsWithSelectedAnswers === null) return;
    
        let total = 0;
        let summaries: QuestionSummary[] = [];
    
        for (const [question, selectedAnswer] of questionsWithSelectedAnswers) {
            const isCorrect = question.answerIndex === selectedAnswer;
            if (isCorrect) {
                total += 1;
            }

            summaries.push(new QuestionSummary(question.text, question.answerIndex, selectedAnswer));
        }
    
        setScore(total);
        setQuestionsAmount(questionsWithSelectedAnswers.size);
        setQuestionsSummaries(summaries);
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.scoreText}>Votre score est : {score}/{questionsAmount}</Text>
            {questionsSummaries.map((question, index) => {
                return <Text style={styles.questionText} key={index}>{question.questionText} -- {question.isAnswerCorrect}</Text>
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        textAlign: 'left',
        marginVertical: 5,
    },
});

export default QuizzSummary;
