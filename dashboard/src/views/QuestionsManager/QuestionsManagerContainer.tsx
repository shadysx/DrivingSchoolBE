
import React, { useEffect, useState } from 'react';
import QuestionsManager from './QuestionsManager'; // Import the presentational component
import { Question } from '../../interfaces/Interfaces'; 
import axios from "axios"
import { API, GET_QUESTIONS } from '../../constants';

function QuestionsManagerContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API + GET_QUESTIONS);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Pass the data as props to the presentational component
  return <QuestionsManager questions={questions} />;
}

export default QuestionsManagerContainer;