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

  // Dialog
  const [open, setOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    console.log(editedData)
  }, [editedData])

  const showEditDialog = (id: GridRowId) => {
    let question = questions.find(q => q.id == id)
    setSelectedQuestion(question) 
    setOpen(true)
  };

  const handleCreate = () => {
    setOpen(true)
    setIsCreating(true)
  }

  const handleDelete = (id: GridRowId) => {

  };

  const handleCloseDialog = () => {
    //Resting dialog on each close
    setSelectedQuestion(createInitialQuestion)
    setIsCreating(false);
    setOpen(false);
    // Stay up to date
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
        handleCreate={handleCreate}
        handleEdit={showEditDialog}
        handleDelete={handleDelete}
      />
      <QuestionViewDialog
        open={open}
        onClose={handleCloseDialog}
        selectedQuestion={selectedQuestion}
        isCreating={isCreating}
      />
    </>
  )
}

export default QuestionsManagerViewContainer;