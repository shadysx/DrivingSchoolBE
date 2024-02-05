import React, { useEffect, useState } from 'react';
import QuestionsManagerView from './QuestionsManagerView'; // Import the presentational component
import { Question, createInitialQuestion } from '../../interfaces/Interfaces'; 
import axios from "axios"
import { API, CREATE_QUESTION, GET_QUESTIONS, UPDATE_QUESTION, UPDATE_QUESTIONS } from '../../constants';
import { GridRowId, unstable_gridTabIndexColumnHeaderFilterSelector } from '@mui/x-data-grid';
import QuestionViewDialog from '../../components/dialogs/QuestionViewDialog/QuestionViewDialog';

function QuestionsManagerViewContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editedData, setEditedData] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(createInitialQuestion);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(editedData)
  }, [editedData])

  // This build a collection of all the edited questions so we can eventually implement
  // a savechanges button instead of saving directly 
  const addQuestionToEditedData = (editedQuestion: Question) => {
    setEditedData((prevEditedData) => {
      const isQuestionEdited = prevEditedData.some((question) => question.id === editedQuestion.id);
  
      if (isQuestionEdited) {
        // If the question is already in editedData, update it
        console.log("Was edited")
        return prevEditedData.map((question) =>
          question.id === editedQuestion.id ? editedQuestion : question
        );
      } else {
        // If the question is not in editedData, add it
        console.log("Was not edited")
        return [...prevEditedData, editedQuestion];
      }
    });
  };

  const showEditDialog = (id: GridRowId, readOnly: boolean = false) => {
    let question = questions.find(q => q.id == id)
    setSelectedQuestion(question) 
    setOpen(true)
  };

  const handleDelete = (id: GridRowId) => {

  };

  const handleCloseDialog = () => {
    console.log('trigger')
    setSelectedQuestion(createInitialQuestion)
    setOpen(false);
    fetchQuestions();
  }

  const fetchQuestions = async () => {
    try {
      console.log("LOG QuestionManager: Fetching questions")
      const response = await axios.get(API + GET_QUESTIONS);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Pass the data as props to the presentational component
  return (
    <>

    <QuestionsManagerView  
            questions={questions} 
            handleDelete={handleDelete}
            handleEdit={showEditDialog}/>
    <QuestionViewDialog open={open} onClose={handleCloseDialog} selectedQuestion={selectedQuestion} />
    </>
  )
}

export default QuestionsManagerViewContainer;